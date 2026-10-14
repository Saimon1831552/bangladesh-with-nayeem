
const express = require("express");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const nodemailer = require("nodemailer");

const router = express.Router();

// Limit repeated booking submissions.
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many booking requests. Please try again later.",
  },
});

const bookingSchema = z.object({
  title: z.enum(["Mr", "Ms"]),
  fullName: z.string().trim().min(2).max(150),
  nationality: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().max(30).optional().default(""),
  people: z.coerce.number().int().min(1).max(12),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tourType: z.enum(["shared", "private"]),
  source: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  tourTitle: z.string().trim().min(1).max(200),
  agreedToPolicy: z.literal(true),
}).strict();

// Configure SMTP using environment variables.
function createTransporter() {
  const required = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "BOOKING_TO_EMAIL",
    "BOOKING_FROM_EMAIL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing email configuration: ${missing.join(", ")}`);
  }

  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

router.post("/", bookingLimiter, async (req, res) => {
  const result = bookingSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the booking form and try again.",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const booking = result.data;

  // Validate the actual calendar date, not just its format.
  const [year, month, day] = booking.startDate.split("-").map(Number);
  const requestedDate = new Date(Date.UTC(year, month - 1, day));

  if (
    requestedDate.getUTCFullYear() !== year ||
    requestedDate.getUTCMonth() !== month - 1 ||
    requestedDate.getUTCDate() !== day
  ) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid tour date.",
    });
  }

  // Compare calendar dates using Bangladesh time.
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  if (booking.startDate < today) {
    return res.status(400).json({
      success: false,
      message: "Please select today or a future date.",
    });
  }

  try {
    const reference = randomUUID()
      .replace(/-/g, "")
      .slice(0, 12)
      .toUpperCase();

    const transporter = createTransporter();

    const emailText = [
      "NEW TOUR BOOKING REQUEST",
      "========================",
      "",
      `Reference: ${reference}`,
      `Tour: ${booking.tourTitle}`,
      `Customer: ${booking.title} ${booking.fullName}`,
      `Nationality: ${booking.nationality}`,
      `Email: ${booking.email}`,
      `WhatsApp: ${booking.whatsapp || "Not provided"}`,
      `Travelers: ${booking.people}`,
      `Start date: ${booking.startDate}`,
      `Tour type: ${booking.tourType}`,
      `How they found us: ${booking.source || "Not provided"}`,
      "",
      "Customer message:",
      booking.message || "No message",
      "",
      "Status: Pending review",
      "This is a booking request, not a confirmed reservation.",
    ].join("\n");

    await transporter.sendMail({
      from: {
        name: "Tour Booking Website",
        address: process.env.BOOKING_FROM_EMAIL,
      },
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: booking.email,
      subject: `New tour booking request - ${reference}`,
      text: emailText,
    });

    return res.status(200).json({
      success: true,
      message: "Your booking request has been sent successfully.",
      reference,
    });
  } catch (error) {
    // Avoid logging customer information or SMTP credentials.
    console.error("Booking email failed:", error.code || error.name);

    return res.status(503).json({
      success: false,
      message: "We could not send your request. Please try again later.",
    });
  }
});

module.exports = router;

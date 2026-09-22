/*const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/booking
router.post('/', async (req, res) => {
  try {
    const {
      tourTitle, priceFmt, title, fullName, nationality, email,
      whatsapp, people, startDate, tourType, source, message,
    } = req.body;

    if (!fullName || !email || !nationality || !startDate) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: process.env.EMAIL_SECURE === 'true', // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const toAddress = process.env.BOOKING_NOTIFY_EMAIL || process.env.EMAIL_USER;

    const row = (label, value) =>
      `<tr><td style="padding:6px 10px;font-weight:700;color:#333;">${label}</td><td style="padding:6px 10px;color:#555;">${value || '—'}</td></tr>`;

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#15803d;">New Booking Request</h2>
        <p style="font-size:14px;color:#333;"><strong>${tourTitle || ''}</strong> — ${priceFmt || ''}</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${row('Name', `${title || ''}. ${fullName}`)}
          ${row('Nationality', nationality)}
          ${row('Email', email)}
          ${row('WhatsApp', whatsapp)}
          ${row('People', people)}
          ${row('Start Date', startDate)}
          ${row('Tour Type', tourType)}
          ${row('Found via', source)}
        </table>
        <p style="font-weight:700;margin-top:16px;">Message</p>
        <p style="white-space:pre-wrap;font-size:14px;color:#555;">${message || '—'}</p>
      </div>
    `;

    // 1) Notify admin
    await transporter.sendMail({
      from: `"Bangladesh With Naim — Bookings" <${process.env.EMAIL_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `New Booking Request: ${tourTitle || 'Tour'} — ${fullName}`,
      html,
    });

    // 2) Confirmation to customer
    await transporter.sendMail({
      from: `"Bangladesh With Naim" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your booking request — ${tourTitle || ''}`,
      html: `<p>Hi ${fullName},</p>
             <p>Thanks for your booking request for <strong>${tourTitle || 'your selected tour'}</strong>.
             We'll get back to you within 24 hours via email or WhatsApp.</p>
             <p>— Bangladesh With Naim</p>`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('booking email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
*/

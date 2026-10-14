const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      fullName,
      nationality,
      email,
      whatsapp,
      people,
      startDate,
      tourType,
      source,
      message,
      tourTitle,
      agreedToPolicy,
    } = req.body;

    if (!fullName || !email || !startDate || !tourTitle) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details.",
      });
    }

    if (agreedToPolicy !== true) {
      return res.status(400).json({
        success: false,
        message: "You must accept the booking policy.",
      });
    }

    // TODO: Send the booking email using your existing email service.
    // Return success only after the email service confirms success.

    return res.status(501).json({
      success: false,
      message: "Booking email service is not configured yet.",
    });
  } catch (error) {
    console.error("Booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process booking request.",
    });
  }
});

module.exports = router;

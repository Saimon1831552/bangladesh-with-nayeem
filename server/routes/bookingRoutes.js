const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Booking routes are working",
  });
});
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

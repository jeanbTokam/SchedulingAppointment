const express = require("express");
const router = express.Router();
const Hairstylist = require("../models/hairstylistModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-hairstylist-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const hairstylist = await Hairstylist.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Hairstylist info fetched successfully",
      data: hairstylist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting hairstylist info", success: false, error });
  }
});

router.post("/get-hairstylist-info-by-id", authMiddleware, async (req, res) => {
  try {
    const hairstylist = await Hairstylist.findOne({ _id: req.body.hairstylistId });
    res.status(200).send({
      success: true,
      message: "Hairstylist info fetched successfully",
      data: hairstylist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting hairstylist info", success: false, error });
  }
});

router.post("/update-hairstylist-profile", authMiddleware, async (req, res) => {
  try {
    const hairstylist = await Hairstylist.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Hairstylist profile updated successfully",
      data: hairstylist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting hairstylist info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-hairstylist-id",
  authMiddleware,
  async (req, res) => {
    try {
      const hairstylist = await Hairstylist.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ hairstylistId: hairstylist._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Hairstylist = require("../models/hairstylistModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-hairstylists", authMiddleware, async (req, res) => {
  try {
    const hairstylists = await Hairstylist.find({});
    res.status(200).send({
      message: "Hairstylists fetched successfully",
      success: true,
      data: hairstylists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying hairstylist account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying hairstylist account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-hairstylist-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { hairstylistId, status } = req.body;
      const hairstylist = await Hairstylist.findByIdAndUpdate(hairstylistId, {
        status,
      });

      const user = await User.findOne({ _id: hairstylist.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-hairstylist-request-changed",
        message: `Your hairstylist account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isHairstylist = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Hairstylist status updated successfully",
        success: true,
        data: hairstylist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying hairstylist account",
        success: false,
        error,
      });
    }
  }
);



module.exports = router;
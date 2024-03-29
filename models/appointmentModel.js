const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hairstylistId: {
      type: String,
      required: true,
    },
    hairstylistInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointmenst", appointmentSchema);
module.exports = appointmentModel;
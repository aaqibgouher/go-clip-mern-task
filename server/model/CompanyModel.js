const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    workEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    resetToken: {
      type: String,
      default: "",
    },
    resetTokenExpiresIn: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("CompanyModel", companySchema, "companies");

module.exports = CompanyModel;

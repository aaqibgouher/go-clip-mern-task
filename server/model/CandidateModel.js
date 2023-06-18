const mongoose = require("mongoose");

const educationalDetailSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    default: "",
  },
  course: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  passingYear: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
  },
});

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: "",
  },
});

const jobDetailSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
});

const candidateSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CompanyModel",
    },
    jobRole: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      default: "",
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    educationalDetails: [educationalDetailSchema],
    hobbies: {
      type: [String],
      default: [],
    },
    preferredLocations: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    certifications: [certificationSchema],
    jobDetails: [jobDetailSchema],
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const CandidateModel = mongoose.model(
  "CandidateModel",
  candidateSchema,
  "candidates"
);

module.exports = CandidateModel;

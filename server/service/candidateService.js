const { body, validationResult, checkSchema } = require("express-validator");
const Output = require("../utils/Output");
const CandidateModel = require("../model/CandidateModel");

const getCandidatesByCompanyId = async (companyId) => {
  return await CandidateModel.find({ companyId });
};

const addCandidate = async (companyId, params) => {
  const { basicDetails, educationDetails, certifications, jobDetails } = params;

  //   if candidate already added
  let candidate = await getByCompanyIdAndEmail(companyId, basicDetails.email);
  if (candidate) throw "Candidate is already exists for this company.";

  let candidateObj = new CandidateModel({
    companyId,
    jobRole: basicDetails.jobRole.trim(),
    name: basicDetails.name.trim(),
    gender: basicDetails.gender.trim(),
    nationality: basicDetails.nationality.trim(),
    mobile: basicDetails.mobile.trim(),
    email: basicDetails.email.trim(),
    linkedIn: "linkedIn" in basicDetails ? basicDetails.linkedIn.trim() : "",
    maritalStatus: basicDetails.maritalStatus.trim(),
    educationalDetails:
      educationDetails && educationDetails.length ? educationDetails : [],
    hobbies:
      basicDetails.hobbies && basicDetails.hobbies.length
        ? basicDetails.hobbies
        : [],
    preferredLocations:
      basicDetails.preferredLocations && basicDetails.preferredLocations.length
        ? basicDetails.preferredLocations
        : [],
    skills:
      basicDetails.skills && basicDetails.skills.length
        ? basicDetails.skills
        : [],
    certifications:
      certifications && certifications.length ? certifications : [],
    jobDetails: jobDetails && jobDetails.length ? jobDetails : [],
    status: "submitted",
  });

  candidateObj.save();

  return { candidateId: candidateObj._id, name: candidateObj.name };
};

const getByCompanyIdAndEmail = async (companyId, candidateEmail) => {
  return await CandidateModel.findOne({ companyId, email: candidateEmail });
};

// Validation middleware for basic details
const validateBasicDetails = [
  body("basicDetails.jobRole")
    .notEmpty()
    .withMessage("Job role is required in basic details."),
  body("basicDetails.name")
    .notEmpty()
    .withMessage("Name is required in basic details."),
  body("basicDetails.gender")
    .notEmpty()
    .withMessage("Gender is required in basic details."),
  body("basicDetails.nationality")
    .notEmpty()
    .withMessage("Nationality is required in basic details."),
  body("basicDetails.mobile")
    .notEmpty()
    .withMessage("Mobile number is required in basic details."),
  body("basicDetails.mobile")
    .isMobilePhone()
    .withMessage("Invalid mobile number in basic details."),
  body("basicDetails.email")
    .notEmpty()
    .withMessage("Email is required in basic details."),
  body("basicDetails.email")
    .isEmail()
    .withMessage("Invalid email address in basic details."),
  body("basicDetails.maritalStatus")
    .notEmpty()
    .withMessage("Marital status is required in basic details."),
];

// Validation middleware for education details
const validateEducationDetails = checkSchema({
  "educationDetails.*.type": {
    notEmpty: {
      errorMessage: "Education type is required in education details.",
    },
  },
  "educationDetails.*.status": {
    isBoolean: {
      errorMessage: "Status must be a boolean value in education details.",
    },
  },
});

// Validation middleware for certifications
const validateCertifications = checkSchema({
  "certifications.*.name": {
    notEmpty: {
      errorMessage: "Name is required in certifications.",
    },
  },
});

// Validation middleware for job details
const validateJobDetails = checkSchema({
  "jobDetails.*.company": {
    notEmpty: {
      errorMessage: "Company is required in job details.",
    },
  },
});

// Validation function
const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map((err) => err.msg);
  return await Output.error(res, extractedErrors);
};

module.exports = {
  addCandidate,
  validateBasicDetails,
  validateEducationDetails,
  validateCertifications,
  validateJobDetails,
  validate,
  getByCompanyIdAndEmail,
  getCandidatesByCompanyId,
};

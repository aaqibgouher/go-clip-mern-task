const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidateController");
const {
  validateBasicDetails,
  validateEducationDetails,
  validateCertifications,
  validateJobDetails,
  validate,
} = require("../service/candidateService");

router.get("/", candidateController.getCandidates);

router.post(
  "/add",
  validateBasicDetails,
  validateEducationDetails,
  validateCertifications,
  validateJobDetails,
  validate,
  candidateController.addCandidate
);

module.exports = router;

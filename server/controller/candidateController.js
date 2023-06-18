const express = require("express");
const Output = require("../utils/Output");
const candidateService = require("../service/candidateService");

const getCandidates = async (req, res) => {
  try {
    let data = await candidateService.getCandidatesByCompanyId(req.company);

    return await Output.success(res, `Successfull get candidates`, data);
  } catch (e) {
    // else error
    console.log(e, "from get candidates controller");
    return await Output.error(res, e);
  }
};

const addCandidate = async (req, res) => {
  try {
    const { basicDetails, educationDetails, certifications, jobDetails } =
      req.body;

    let data = await candidateService.addCandidate(req.company, {
      basicDetails,
      educationDetails,
      certifications,
      jobDetails,
    });

    return await Output.success(res, `Successfull added a candidate`, data);
  } catch (e) {
    // else error
    console.log(e, "from add candidate controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  addCandidate,
  getCandidates,
};

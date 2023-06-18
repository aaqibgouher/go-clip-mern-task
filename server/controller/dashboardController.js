const express = require("express");
const Output = require("../utils/Output");
const companyService = require("../service/companyService");

const getCompanyDetails = async (req, res) => {
  try {
    let data = await companyService.getById(req.company);

    return await Output.success(res, `Successfull get company details`, data);
  } catch (e) {
    // else error
    console.log(e, "from get company details controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getCompanyDetails,
};

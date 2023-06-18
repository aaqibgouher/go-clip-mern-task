const express = require("express");
const Output = require("../utils/Output");
const authService = require("../service/authService");

// register method
const register = async (req, res) => {
  try {
    const { fullName, companyName, mobileNo, workEmail, role } = req.body;

    const params = {
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      mobileNo: mobileNo.trim(),
      role: role.trim(),
    };

    let data = await authService.register(workEmail, params);

    return await Output.success(
      res,
      `Successfull sent password on the ${workEmail}`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from register controller");
    return await Output.error(res, e);
  }
};

const login = async (req, res) => {
  try {
    let { workEmail, password } = req.body;

    let data = await authService.login(workEmail, password);

    return await Output.success(res, `Successfull login`, data);
  } catch (e) {
    // else error
    console.log(e, "from login controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  register,
  login,
};

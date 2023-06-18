const companyService = require("./companyService");
const Utilities = require("../utils/Utilities");
const JWTLibrary = require("../utils/JWTLibrary");

const register = async (workEmail, params) => {
  // company added
  const companyId = await companyService.addCompany(workEmail, params);

  return { companyId };
};

const login = async (workEmail, password) => {
  // validation
  if (!workEmail || !workEmail.trim()) throw "Work email is required.";
  if (!(await Utilities.isValidWorkEmail(workEmail)))
    throw "Invalid work email.";

  if (!password || !password.trim()) throw "Password is required.";

  // get company by email
  let company = await companyService.getByEmail(workEmail, true);

  if (!company) throw "Email does not exisits.";

  // password verify
  if (!(await Utilities.comparePassword(password, company.password)))
    throw "User/Password is incorrect.";

  // generate jwt
  let token = await JWTLibrary.generateToken({ companyId: company._id });

  return { workEmail, token };
};

module.exports = {
  register,
  login,
};

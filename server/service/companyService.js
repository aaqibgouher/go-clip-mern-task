const Utilities = require("../utils/Utilities");
const CompanyModel = require("../model/CompanyModel");

const addCompany = async (workEmail, params) => {
  // validations
  if (!workEmail || !workEmail.trim()) throw "Work email is required.";
  if (!(await Utilities.isValidWorkEmail(workEmail)))
    throw "Invalid work email.";

  // params validation
  if (!"fullName" in params || !params.fullName || !params.fullName.trim())
    throw "Full name is required.";
  if (
    !"companyName" in params ||
    !params.companyName ||
    !params.companyName.trim()
  )
    throw "Company name is required.";
  if (!"mobileNo" in params || !params.mobileNo || !params.mobileNo.trim())
    throw "Mobile no. is required.";
  if (!"role" in params || !params.role || !params.role.trim())
    throw "Role is required.";

  // get by company name
  let company = await getByNameAndEmail(params.companyName, workEmail);

  if (company) throw "Company name and email should be unique.";

  //   generate random password
  const randomPassword = await Utilities.generateRandomPassword();

  // add company
  const companyObj = new CompanyModel({
    role: params.role,
    fullName: params.fullName,
    companyName: params.companyName,
    mobileNo: params.mobileNo,
    workEmail: workEmail,
    password: await Utilities.hashPassword(randomPassword),
    resetToken: "",
    resetTokenExpiresIn: "",
  });

  companyObj.save();

  //   send email
  await Utilities.sendPasswordOnEmail(
    workEmail,
    `This is your temp password, please login ${randomPassword}`
  );

  return companyObj._id;
};

const getByNameAndEmail = async (
  companyName,
  workEmail,
  includePassword = false
) => {
  let query = CompanyModel.findOne({
    $or: [{ companyName }, { workEmail }],
  });

  if (!includePassword) {
    query = query.select("-password");
  }

  const company = await query.exec();
  return company;
};

const getByEmail = async (workEmail, includePassword = false) => {
  let query = CompanyModel.findOne({ workEmail });

  if (!includePassword) {
    query = query.select("-password");
  }

  const company = await query.exec();

  return company;
};

const getById = async (id, includePassword = false) => {
  let query = CompanyModel.findById(id);

  if (!includePassword) {
    query = query.select("-password");
  }

  const company = await query.exec();

  return company;
};

module.exports = {
  addCompany,
  getByNameAndEmail,
  getByEmail,
  getById,
};

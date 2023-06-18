import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import { addCandidateAction } from "../../actions/candidate/candidateActions";

const steps = [
  "Personal Details",
  "Educational Qualifications",
  "Skills",
  "Certifications",
  "Job Experience",
];

const AddCandidateComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [certificationRows, setCertifications] = useState([
    { name: "", organization: "", date: "", action: "" },
  ]);
  const [jobDetailsRows, setJobDetails] = useState([
    { companyName: "", role: "", duration: "", action: "" },
  ]);
  const [genderList, setGenderList] = useState([
    { id: 1, title: "Male", value: "male" },
    { id: 2, title: "Female", value: "female" },
    { id: 3, title: "Others", value: "others" },
  ]);
  const [nationalityList, setNationalityList] = useState([
    { id: 1, name: "America" },
    { id: 2, name: "India" },
    { id: 3, name: "Germany" },
    { id: 4, name: "Dubai" },
    { id: 5, name: "Others" },
  ]);
  const [marital, setMarital] = useState([
    { id: 1, name: "Single" },
    { id: 2, name: "Married" },
    { id: 5, name: "Others" },
  ]);
  const [answer, setAnswer] = useState([
    { id: 1, title: "Yes", value: "true" },
    { id: 2, title: "No", value: "false" },
  ]);

  //   validation
  //   personal details
  const [jobRole, setJobRole] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personalDetailErrors, setPersonalDetailsErrors] = useState({});

  //   education qualification
  // post graduation
  const [postGraduationStatus, setPostGraduationStatus] = useState("false");
  const [postGraduationCollegeName, setPostGraduationCollegeName] =
    useState("");
  const [postGraduationCourse, setPostGraduationCourse] = useState("");
  const [postGraduationCity, setPostGraduationCity] = useState("");
  const [postGraduationYear, setPostGraduationYear] = useState("");

  // graduation
  const [graduationStatus, setGraduationStatus] = useState("false");
  const [graduationCollegeName, setGraduationCollegeName] = useState("");
  const [graduationCourse, setGraduationCourse] = useState("");
  const [graduationCity, setGraduationCity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // equivalent
  const [equivalentStatus, setEquivalentStatus] = useState("false");
  const [equivalentCollegeName, setEquivalentCollegeName] = useState("");
  const [equivalentCourse, setEquivalentCourse] = useState("");
  const [equivalentCity, setEquivalentCity] = useState("");
  const [equivalentYear, setEquivalentYear] = useState("");
  const [educationDetailErrors, setEducationDetailsErrors] = useState({});

  //   validation
  //   certifications

  //   validation
  //   job experience

  const handleCertificationAddRow = () => {
    setCertifications([
      ...certificationRows,
      { name: "", organization: "", date: "", action: "" },
    ]);
  };

  const handleCertificationDeleteRow = (index) => {
    const updatedRows = [...certificationRows];
    updatedRows.splice(index, 1);
    setCertifications(updatedRows);
  };

  const handleJobDetailAddRow = () => {
    setJobDetails([
      ...jobDetailsRows,
      { name: "", organization: "", date: "", action: "" },
    ]);
  };

  const handleJobDetailDeleteRow = (index) => {
    const updatedRows = [...jobDetailsRows];
    updatedRows.splice(index, 1);
    setJobDetails(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...certificationRows];
    updatedRows[index][field] = value;
    setCertifications(updatedRows);
  };

  const handleNext = () => {
    // check current step is valid or not
    const isValidated = validateSteps();
    console.log(isValidated, "from validate");
    // if validated, move to next section
    if (isValidated) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    // else show errors
  };

  const handleSaveProfile = async (e) => {
    console.log("final");
    e.preventDefault();

    // creating an object
    let candidateObj = {
      basicDetails: {
        jobRole,
        name,
        gender,
        nationality,
        mobile,
        email,
        linkedIn,
        maritalStatus,
        hobbies,
        preferredLocations,
        skills,
      },
      educationDetails: [
        {
          type: "post graduation",
          college: postGraduationCollegeName,
          course: postGraduationCourse,
          city: postGraduationCity,
          passingYear: postGraduationYear,
          status: postGraduationStatus,
        },
        {
          type: "graduation",
          college: graduationCollegeName,
          course: graduationCourse,
          city: graduationCity,
          passingYear: graduationYear,
          status: graduationStatus,
        },
        {
          type: "high school/equivalent",
          college: equivalentCollegeName,
          course: equivalentCourse,
          city: equivalentCity,
          passingYear: equivalentYear,
          status: equivalentStatus,
        },
      ],
      certifications: [
        {
          name: "c++",
          organization: "TOCS",
          date: "",
        },
        {
          name: "js",
          organization: "TOCS",
          date: "",
        },
      ],
      jobDetails: [{ company: "First company", role: "SDE", duration: "2yr" }],
    };

    try {
      const response = await dispatch(addCandidateAction(candidateObj));

      if ("status" in response && response.status === 200) {
        console.log("added");
        navigate("/candidate");
      }
    } catch (error) {
      console.log(error, "from register component");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateSteps = () => {
    console.log(activeStep, "active");
    switch (activeStep) {
      case 0:
        console.log("personal details");
        // Validation checks
        const errors = {};
        if (!jobRole) {
          errors.jobRole = "Job role is required";
        }
        if (!name) {
          errors.name = "Name is required";
        }
        if (!gender) {
          errors.gender = "Gender is required";
        }
        if (!nationality) {
          errors.nationality = "Nationality is required";
        }
        if (!mobile) {
          errors.mobile = "Mobile is required";
        }
        if (!email) {
          errors.email = "Email is required";
        }
        if (!linkedIn) {
          errors.linkedIn = "LinkedIn is required";
        }
        if (!maritalStatus) {
          errors.maritalStatus = "Marital status is required";
        }

        // If there are errors, update the state and prevent form submission
        if (Object.keys(errors).length > 0) {
          setPersonalDetailsErrors(errors);
          return false;
        }
        break;
      case 1:
        console.log("education details");
        // Validation checks
        const educationErrors = {};
        if (postGraduationStatus == "true") {
          if (!postGraduationCollegeName) {
            educationErrors.postGraduationCollegeName = "College is required";
          }
          if (!postGraduationCourse) {
            educationErrors.postGraduationCourse = "Course is required";
          }
          if (!postGraduationCity) {
            educationErrors.postGraduationCity = "City is required";
          }
          if (!postGraduationYear) {
            educationErrors.postGraduationYear = "Year is required";
          }
        }

        if (graduationStatus == "true") {
          if (!graduationCollegeName) {
            educationErrors.graduationCollegeName = "College is required";
          }
          if (!graduationCourse) {
            educationErrors.graduationCourse = "Course is required";
          }
          if (!graduationCity) {
            educationErrors.graduationCity = "City is required";
          }
          if (!graduationYear) {
            educationErrors.graduationYear = "Year is required";
          }
        }

        if (equivalentStatus == "true") {
          if (!equivalentCollegeName) {
            educationErrors.equivalentCollegeName = "College is required";
          }
          if (!equivalentCourse) {
            educationErrors.equivalentCourse = "Course is required";
          }
          if (!equivalentCity) {
            educationErrors.equivalentCity = "City is required";
          }
          if (!equivalentYear) {
            educationErrors.equivalentYear = "Year is required";
          }
        }

        // If there are errors, update the state and prevent form submission
        if (Object.keys(educationErrors).length > 0) {
          setEducationDetailsErrors(educationErrors);
          return false;
        }
        break;
      case 2:
        console.log("skills details");
        break;
      case 3:
        console.log("certifications details");
        break;
      default:
        console.log("");
    }

    return true;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box mt={2}>
            <Grid container spacing={2} sx={{ padding: "2rem" }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Job Role/Position *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="eg. Sales Manager"
                  size="small"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  error={!!personalDetailErrors.jobRole}
                  helperText={personalDetailErrors.jobRole}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Name *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Full Name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!personalDetailErrors.name}
                  helperText={personalDetailErrors.name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Gender *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {genderList.map((gen, index) => (
                      <MenuItem key={index} value={gen.value}>
                        {gen.title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!personalDetailErrors.gender && (
                    <Typography variant="caption" color="error">
                      {personalDetailErrors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Nationality *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Nationality</InputLabel>
                  <Select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    {nationalityList.map((nation, index) => (
                      <MenuItem key={index} value={nation.name}>
                        {nation.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!personalDetailErrors.nationality && (
                    <Typography variant="caption" color="error">
                      {personalDetailErrors.nationality}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Mobile *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter 10 Digit Mobile No."
                  size="small"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  error={!!personalDetailErrors.mobile}
                  helperText={personalDetailErrors.mobile}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Email *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Your Email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!personalDetailErrors.email}
                  helperText={personalDetailErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">LinkedIn *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Your Linkedin Profile URL"
                  size="small"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  error={!!personalDetailErrors.linkedIn}
                  helperText={personalDetailErrors.linkedIn}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Marital Status *</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Status</InputLabel>
                  <Select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    {marital.map((mar, index) => (
                      <MenuItem key={index} value={mar.name}>
                        {mar.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!personalDetailErrors.maritalStatus && (
                    <Typography variant="caption" color="error">
                      {personalDetailErrors.maritalStatus}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Hobbies</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Comma Separated"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  Preferred Job Location
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Comma Separated"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box mt={2}>
            <Grid container spacing={2} sx={{ padding: "1rem 2rem" }}>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Post Graduation *</InputLabel>
                  <Select
                    value={postGraduationStatus}
                    label="Age"
                    onChange={(e) => setPostGraduationStatus(e.target.value)}
                  >
                    {answer.map((ans, index) => (
                      <MenuItem key={index} value={ans.value}>
                        {ans.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="College Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="College Name"
                  value={postGraduationCollegeName}
                  onChange={(e) => setPostGraduationCollegeName(e.target.value)}
                  error={!!educationDetailErrors.postGraduationCollegeName}
                  helperText={educationDetailErrors.postGraduationCollegeName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Course/Subject"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Course/Subject"
                  value={postGraduationCourse}
                  onChange={(e) => setPostGraduationCourse(e.target.value)}
                  error={!!educationDetailErrors.postGraduationCourse}
                  helperText={educationDetailErrors.postGraduationCourse}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="City"
                  value={postGraduationCity}
                  onChange={(e) => setPostGraduationCity(e.target.value)}
                  error={!!educationDetailErrors.postGraduationCity}
                  helperText={educationDetailErrors.postGraduationCity}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Passing Year"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Passing Year"
                  value={postGraduationYear}
                  onChange={(e) => setPostGraduationYear(e.target.value)}
                  error={!!educationDetailErrors.postGraduationYear}
                  helperText={educationDetailErrors.postGraduationYear}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: "1rem 2rem" }}>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Graduation *</InputLabel>
                  <Select
                    value={graduationStatus}
                    label="Age"
                    onChange={(e) => setGraduationStatus(e.target.value)}
                  >
                    {answer.map((ans, index) => (
                      <MenuItem key={index} value={ans.value}>
                        {ans.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="College Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="College Name"
                  value={graduationCollegeName}
                  onChange={(e) => setGraduationCollegeName(e.target.value)}
                  error={!!educationDetailErrors.graduationCollegeName}
                  helperText={educationDetailErrors.graduationCollegeName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Course/Subject"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Course/Subject"
                  value={graduationCourse}
                  onChange={(e) => setGraduationCourse(e.target.value)}
                  error={!!educationDetailErrors.graduationCourse}
                  helperText={educationDetailErrors.graduationCourse}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="City"
                  value={graduationCity}
                  onChange={(e) => setGraduationCity(e.target.value)}
                  error={!!educationDetailErrors.graduationCity}
                  helperText={educationDetailErrors.graduationCity}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Passing Year"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Passing Year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  error={!!educationDetailErrors.graduationYear}
                  helperText={educationDetailErrors.graduationYear}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: "1rem 2rem" }}>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>12/Equivalent *</InputLabel>
                  <Select
                    value={equivalentStatus}
                    label="Age"
                    onChange={(e) => setEquivalentStatus(e.target.value)}
                  >
                    {answer.map((ans, index) => (
                      <MenuItem key={index} value={ans.value}>
                        {ans.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="College Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="College Name"
                  value={equivalentCollegeName}
                  onChange={(e) => setEquivalentCollegeName(e.target.value)}
                  error={!!educationDetailErrors.equivalentCollegeName}
                  helperText={educationDetailErrors.equivalentCollegeName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Course/Subject"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Course/Subject"
                  value={equivalentCourse}
                  onChange={(e) => setEquivalentCourse(e.target.value)}
                  error={!!educationDetailErrors.equivalentCourse}
                  helperText={educationDetailErrors.equivalentCourse}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="City"
                  value={equivalentCity}
                  onChange={(e) => setEquivalentCity(e.target.value)}
                  error={!!educationDetailErrors.equivalentCity}
                  helperText={educationDetailErrors.equivalentCity}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Passing Year"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Passing Year"
                  value={equivalentYear}
                  onChange={(e) => setEquivalentYear(e.target.value)}
                  error={!!educationDetailErrors.equivalentYear}
                  helperText={educationDetailErrors.equivalentYear}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box mt={2}>
            <Grid container spacing={2} sx={{ padding: "1rem 2rem" }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Add Skills</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Comma Separated"
                  size="small"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box mt={2}>
            <Grid
              container
              spacing={2}
              sx={{ padding: "1rem 2rem" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Add your Certification(s), If you have done
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleCertificationAddRow}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "2rem" }}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ padding: "1rem 2rem" }}
              justifyContent="space-between"
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Organization
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {certificationRows.map((certification, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={certification.name}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                            placeholder="Name"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={certification.organization}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Organization"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={certification.date}
                            onChange={(e) =>
                              handleInputChange(index, "date", e.target.value)
                            }
                            placeholder="Date"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleCertificationDeleteRow(index)}
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: "2rem" }}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        );
      case 4:
        return (
          <Box mt={2}>
            <Grid
              container
              spacing={2}
              sx={{ padding: "1rem 2rem" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Add your Past/Current Job Experience(s)
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleJobDetailAddRow}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "2rem" }}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ padding: "1rem 2rem" }}
              justifyContent="space-between"
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Organization
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobDetailsRows.map((jobDetail, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={jobDetail.companyName}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                            placeholder="Name"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={jobDetail.role}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Organization"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={jobDetail.duration}
                            onChange={(e) =>
                              handleInputChange(index, "date", e.target.value)
                            }
                            placeholder="Date"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleJobDetailDeleteRow(index)}
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: "2rem" }}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />

      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" mt={1}>
            <Grid item>
              <Typography
                mb={4}
                variant="h6"
                noWrap
                component="div"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                Add Candidate
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/candidate">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "2rem" }}
                >
                  <ArrowBackIcon />
                </Button>
              </Link>
            </Grid>
          </Grid>
          <div>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {renderStepContent(activeStep)}

              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCandidateComponent;

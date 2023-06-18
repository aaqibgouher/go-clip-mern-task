const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// middleware
const authMiddleware = require("./middleware/authMiddleware");

// db configuration
require("./database/config");

const CompanyModel = require("./model/CompanyModel");
const CandidateModel = require("./model/CandidateModel");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", authMiddleware.isAuthenticate, dashboardRoutes);
app.use("/api/candidate", authMiddleware.isAuthenticate, candidateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

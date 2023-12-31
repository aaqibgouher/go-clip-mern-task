import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginUserAction } from "../../actions/auth/authActions";

const LoginComponent = () => {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(workEmail, password);

    // Validation checks
    const errors = {};
    if (!workEmail) {
      errors.workEmail = "Work Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const userData = {
      workEmail,
      password,
    };

    try {
      const response = await dispatch(loginUserAction(userData));

      if ("status" in response && response.status === 200) {
        console.log(response, "from res");
        setWorkEmail("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "from register component");
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ padding: "3rem" }}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12} mt={4}>
              <TextField
                size="small"
                label="Work Email"
                variant="outlined"
                fullWidth
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                error={!!errors.workEmail}
                helperText={errors.workEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid container justifyContent="space-between" mt={1}>
              <Grid item ml={2}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Grid>
              <Grid item>
                <Link to="/reset-password">Forgot password?</Link>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "2rem" }}
                fullWidth
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography mt={2} align="center">
        New at OpenInterveu ? Register account.
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "2rem" }}
          >
            Register Account
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default LoginComponent;

import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ResetPasswordComponent = () => {
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
                RESET PASSWORD
              </Typography>
            </Grid>
            <Grid item xs={12} mt={4}>
              <TextField label="Username" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} mt={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "2rem" }}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography mt={2} align="center">
                Return to <Link to="/login">Login Screen</Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordComponent;

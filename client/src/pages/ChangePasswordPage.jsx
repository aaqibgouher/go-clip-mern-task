import React from "react";
import AppLayout from "../layouts/AppLayout";
import { Box, Toolbar } from "@mui/material";

const ChangePasswordPage = () => {
  return (
    <AppLayout>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        Change Password Page
      </Box>
    </AppLayout>
  );
};

export default ChangePasswordPage;

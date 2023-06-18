import React from "react";
import AppLayout from "../layouts/AppLayout";
import { Box, Toolbar } from "@mui/material";

const ProfilePage = () => {
  return (
    <AppLayout>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        Profile Page
      </Box>
    </AppLayout>
  );
};

export default ProfilePage;

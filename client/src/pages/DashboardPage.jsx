import React from "react";
import AppLayout from "../layouts/AppLayout";
import { Box, Toolbar } from "@mui/material";
import AccountComponent from "../components/dashboard/AccountComponent";

const DashboardPage = ({ children }) => {
  return (
    <AppLayout>
      <AccountComponent />
    </AppLayout>
  );
};

export default DashboardPage;

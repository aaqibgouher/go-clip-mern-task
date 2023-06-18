import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import ResetPasswordComponent from "../components/auth/ResetPasswordComponent";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordComponent />
    </AuthLayout>
  );
};

export default ResetPasswordPage;

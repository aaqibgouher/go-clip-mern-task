import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import RegisterComponent from "../components/auth/RegisterComponent";

function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
}

export default RegisterPage;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CandidatePage from "./pages/CandidatePage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AddCandidatePage from "./pages/AddCandidatePage";
import ModelComponent from "./components/helper/ModelComponent";
import AuthRoute from "./AuthRoute";

function App() {
  return (
    <>
      <ModelComponent />
      <Router>
        <Routes>
          {/* Authenticated Routes */}
          <Route path="/" element={<AuthRoute component={DashboardPage} />} />
          <Route
            path="/candidate"
            element={<AuthRoute component={CandidatePage} />}
          />
          <Route
            path="/candidate/add"
            element={<AuthRoute component={AddCandidatePage} />}
          />
          <Route
            path="/profile"
            element={<AuthRoute component={ProfilePage} />}
          />
          <Route
            path="/change-password"
            element={<AuthRoute component={ChangePasswordPage} />}
          />
          <Route
            path="/logout"
            element={<AuthRoute component={DashboardPage} />}
          />
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

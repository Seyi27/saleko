import React from "react";
import "./App.css";
import SignUp from "./pages/sign-up/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import CreateAccount from "./components/auth/create-account/CreateAccount";
import ConfirmPhoneEmail from "./components/auth/confirm-phone-email/ConfirmPhoneEmail";
import ProfileSetup from "./components/auth/profile-setup/ProfileSetup";
import ForgotPasswordRequest from "./components/auth/forgot-password-request/ForgotPasswordRequest";
import ForgotPasswordVerification from "./components/auth/forgot-password-verification/ForgotPasswordVerification";
import ForgotPasswordReset from "./components/auth/forgot-password-reset/ForgotPasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}>
          <Route index element={<CreateAccount />} />
          <Route path="/verification" element={<ConfirmPhoneEmail />} />
          <Route path="/setup-profile" element={<ProfileSetup />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />}>
          <Route index element={<ForgotPasswordRequest />} />
          <Route path="verification" element={<ForgotPasswordVerification />} />
          <Route path="reset" element={<ForgotPasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

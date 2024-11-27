import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import CustomButton from "../../components/custom-button/CustomButton";
import AuthNavHeader from "../../components/auth/auth-nav-header/AuthNavHeader";
import ConfirmPhoneEmail from "../../components/auth/confirm-phone-email/ConfirmPhoneEmail";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";
import CustomModal from "../../components/custom-modal/CustomModal";
import { Outlet, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <AuthNavHeader auth="forgotPassword" />

      <Outlet />
    </div>
  );
};

export default ForgotPassword;

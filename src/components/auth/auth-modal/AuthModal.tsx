import React, { useState } from "react";
import "./AuthModal.css";
import CreateAccount from "../create-account/CreateAccount";
import ConfirmPhoneEmail from "../confirm-phone-email/ConfirmPhoneEmail";
import ProfileSetup from "../profile-setup/ProfileSetup";
import LoginForm from "../login-form/LoginForm";
import ForgotPasswordRequest from "../forgot-password-request/ForgotPasswordRequest";
import ForgotPasswordVerification from "../forgot-password-verification/ForgotPasswordVerification";
import ForgotPasswordReset from "../forgot-password-reset/ForgotPasswordReset";
import { useDispatch, useSelector } from "react-redux";
import { addActiveScreen } from "../../../slice/authValueSlice";
import { AuthModalProps } from "../../../types/types";
import { RootState } from "../../../store/store";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";

const AuthModal = ({
  isOpen,
  handleCloseModal,
  handleOpenSignupModal,
  handleOpenLoginModal,
  handleOpenResetPasswordModal
}: AuthModalProps) => {
  //   const [activeScreen, setActiveScreen] = useState("create_account");

  const dispatch = useDispatch();
  const activeScreen = useSelector(
    (state: RootState) => state.authValue.activeScreen
  );

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleAuthNavigate = (screen: string) => {
    // setActiveScreen(screen);
    dispatch(addActiveScreen(screen));
  };


  const renderModal = () => {
    switch (activeScreen) {
      case "create_account":
        return (
          <CreateAccount
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
          />
        );
        break;

      case "verify_account":
        return (
          <ConfirmPhoneEmail
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
          />
        );
        break;

      case "profile_setup":
        return (
          <ProfileSetup
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
            handleOpenSignupModal={handleOpenSignupModal}
          />
        );
        break;

      case "login_form":
        return (
          <LoginForm
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
            handleOpenLoginModal={handleOpenLoginModal}
          />
        );
        break;

      case "forgot_password_request":
        return (
          <ForgotPasswordRequest
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
          />
        );
        break;

      case "forgot_password_verification":
        return (
          <ForgotPasswordVerification
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
          />
        );
        break;

      case "forgot_password_reset":
        return (
          <ForgotPasswordReset
            handleCloseModal={handleCloseModal}
            handleAuthNavigate={handleAuthNavigate}
            handleOpenResetPasswordModal={handleOpenResetPasswordModal}
          />
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal-content">
        {renderModal()}
      </div>
    </div>
  );
};

export default AuthModal;

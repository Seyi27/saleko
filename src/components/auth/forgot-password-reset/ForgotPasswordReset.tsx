import React, { useEffect, useState } from "react";
import "./ForgotPasswordReset.css";
import CustomButton from "../../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";
import CustomModal from "../../custom-modal/CustomModal";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { AuthModalScreenProps } from "../../../types/types";
import { useResetPasswordMutation } from "../../../services/authApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showCustomToast } from "../../custom-toast/CustomToast";

const ForgotPasswordReset = ({
  handleCloseModal,
  handleAuthNavigate,
  handleOpenResetPasswordModal,
}: AuthModalScreenProps) => {
  const [resetPasswordDisabled, setResetPasswordDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const fpEmailPhoneText = useSelector(
    (state: RootState) => state.authValue.fpEmailPhoneText
  );

  const fpTempOtp = useSelector(
    (state: RootState) => state.authValue.fpTempOtpForPasswordReset
  );

  const [resetPassword, { data, isSuccess, isError, error, isLoading }] =
    useResetPasswordMutation();

  const handlePasswordInput = (key: string, e: string) => {
    switch (key) {
      case "password":
        setPassword(e.trim());
        if (!e.trim()) {
          setPasswordError("Password cannot be empty");
        } else {
          setPasswordError("");
        }
        break;
      case "confirm_password":
        setConfirmPassword(e.trim());
        if (!e.trim()) {
          setConfirmPasswordError("Password cannot be empty");
        } else if (password !== e.trim()) {
          setConfirmPasswordError("Passwords do not match");
        } else {
          setConfirmPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      password &&
      confirmPassword &&
      !confirmPasswordError &&
      !passwordError
    ) {
      setResetPasswordDisabled(false);
    } else {
      setResetPasswordDisabled(true);
    }
  }, [password, passwordError, confirmPassword, confirmPasswordError]);

  // for reset password
  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
      handleOpenResetPasswordModal?.();

      showCustomToast({
        message: "Password reset successfull",
        type: "success",
      });
    }

    if (isError && error) {
      if ("status" in error) {
        if (error.status == 400 || error.status == 422) {
          showCustomToast({
            message: "Kindly try again...",
            type: "error",
          });
        }
      }
    }
  }, [data, isSuccess, isError, error]);

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resetPasswordBody = {
      otp: fpTempOtp,
      password: password,
      password_confirmation: confirmPassword,
      username: fpEmailPhoneText,
    };

    resetPassword(resetPasswordBody);
  };

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={() =>
          handleAuthNavigate("forgot_password_verification")
        }
      />

      <div className="forgot_password_reset_container">
        <p className="forgot_password_reset_text">Set new password</p>

        <form onSubmit={handleResetPasswordSubmit} className="fp_reset_form">
          {/* Password */}
          <CustomTextInput
            type={"password"}
            name={"password"}
            value={password}
            label={"Password"}
            errorMessage={passwordError}
            idAndHtmlFor={"pass_word"}
            handleTextInput={handlePasswordInput}
          />

          {/* Confirm Password */}
          <CustomTextInput
            type={"password"}
            name={"confirm_password"}
            value={confirmPassword}
            label={"Confirm password*"}
            errorMessage={confirmPasswordError}
            idAndHtmlFor={"confirm_password"}
            handleTextInput={handlePasswordInput}
            noPasswordChecklist
          />

          <div style={{ margin: "20px" }} />

          {/* Continue Button */}
          <CustomButton
            label="Reset Password"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            disabled={resetPasswordDisabled}
            onClick={handleResetPasswordSubmit}
            loader={isLoading}
          />
        </form>
      </div>

      {/* <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        label="password_reset"
        onclick={handleResetPasswordModal}
      /> */}
    </>
  );
};

export default ForgotPasswordReset;

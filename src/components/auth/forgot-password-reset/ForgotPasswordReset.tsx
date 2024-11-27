import React, { useEffect, useState } from "react";
import "./ForgotPasswordReset.css";
import CustomButton from "../../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";
import CustomModal from "../../custom-modal/CustomModal";
import CustomTextInput from "../../custom-textInput/CustomTextInput";

const ForgotPasswordReset = () => {
  const [resetPasswordDisabled, setResetPasswordDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleResetPasswordModal = () => {
    navigate("/login");
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordInput = (key:string,e: string) => {
    setPassword(e.trim());
    if (!e.trim()) {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (password && !passwordError) {
      setResetPasswordDisabled(false);
    } else {
      setResetPasswordDisabled(true);
    }
  }, [password, passwordError]);

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <div className="forgot_password_reset_container">
        <p className="forgot_password_reset_text">Set new password</p>

        <form onSubmit={handleResetPasswordSubmit}>
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
          />
        </form>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        label="password_reset"
        onclick={handleResetPasswordModal}
      />
    </>
  );
};

export default ForgotPasswordReset;

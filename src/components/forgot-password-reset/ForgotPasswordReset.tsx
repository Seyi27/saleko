import React, { useEffect, useState } from "react";
import "./ForgotPasswordReset.css";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";
import CustomModal from "../custom-modal/CustomModal";

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

  const handlePasswordInput = (e: string) => {
    setPassword(e.trim());
    if (!e.trim()) {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
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
          <div className="password_input_box">
            <div
              className={`password_textinput_container ${
                passwordError && "error_textInput"
              }`}
            >
              <input
                type={toggleVisibility ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordInput(e.target.value)}
                className="password_textinput"
              />
              <span onClick={handleToggle}>
                {toggleVisibility ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <label
              className={`${password.length > 0 ? "password_label" : ""}  ${
                passwordError ? "error_label" : ""
              }`}
            >
              Password
            </label>
            {passwordError && (
              <span className="error_message">{passwordError}</span>
            )}
          </div>

          {/* Password Checklist */}
          {password && (
            <div className="password_checklist_container">
              <PasswordChecklist
                rules={[
                  "minLength",
                  "capital",
                  "lowercase",
                  "number",
                  "specialChar",
                ]}
                minLength={8}
                value={password}
                onChange={(isValid) => {}}
                messages={{
                  minLength: "8 characters",
                  number: "Number",
                  capital: "Uppercase",
                  specialChar: "Special Characters",
                  lowercase: "Lowercase",
                }}
                className="password_checklist"
                hideIcon={true}
                validTextColor="white"
                invalidTextColor="white"
              />
            </div>
          )}

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

import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import encrypted_ic from "../../../assets/images/svg/encrypted_ic.svg";
import { AuthValueProps } from "../../../types/types";

const LoginForm = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthValueProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "email":
        setEmail(e.trim());
        if (!e.trim()) {
          setEmailError("Email cannot be empty");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())) {
          // if email is not valid
          setEmailError("Email is not valid");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        setPassword(e.trim());
        if (!e.trim()) {
          setPasswordError("Password cannot be empty");
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  // Function to check if the form is valid and enable/disable the button
  const checkFormValidity = () => {
    if (email && password && !emailError && !passwordError) {
      setButtonDisabled(false); // Enable button
    } else {
      setButtonDisabled(true); // Disable button
    }
  };

  // Trigger form validation whenever any input changes
  useEffect(() => {
    checkFormValidity();
  }, [email, password, emailError, passwordError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <CloseModalContainer
        cancelIconOnly
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={handleAuthNavigate}
      />

      <div className="login_form_container">
        <p className="login_text">Login</p>

        <p className="data_encrypted_text">
          <img src={encrypted_ic} />
          All data will be encrypted
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <CustomTextInput
            type={"normal"}
            name={"email"}
            value={email}
            label={"Enter your email"}
            errorMessage={emailError}
            idAndHtmlFor={"emailInput"}
            handleTextInput={handleTextInput}
          />

          {/* Password */}
          <CustomTextInput
            type={"password"}
            name={"password"}
            value={password}
            label={"Enter password*"}
            errorMessage={passwordError}
            idAndHtmlFor={"passwordInput"}
            handleTextInput={handleTextInput}
            noPasswordChecklist
          />

          <div style={{ margin: "20px" }} />

          <div
            className="forgot_password"
            onClick={() => handleAuthNavigate("forgot_password_request")}
          >
            <p>Forgot Password?</p>
          </div>

          <div style={{ margin: "20px" }} />

          {/* Login Button */}
          <CustomButton
            label="Login"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            disabled={buttonDisabled}
            onClick={handleSubmit}
          />
        </form>

        <div className="have_an_account_container">
          <p>
            Don’t have an account?{" "}
            <span onClick={() => handleAuthNavigate("create_account")}>
              Register
            </span>
          </p>
        </div>

        <div style={{ margin: "30px" }} />

        {/* Form Divider */}
        <div className="form_divider">
          <hr
            style={{ width: "100%", marginRight: "20px", marginLeft: "20px" }}
          />
          <p style={{ fontSize: "12px", color: "#8E8E8E" }}>Or</p>
          {/* <div className="divider" /> */}
          <hr
            style={{ width: "100%", marginRight: "20px", marginLeft: "20px" }}
          />
        </div>

        <div style={{ margin: "20px" }} />

        {/* Continue with Apple */}
        <CustomButton
          label="Continue with Apple"
          width={"100%"}
          height="55px"
          bgColor="white"
          borderColor="#DFDFDF"
          borderWidth="1px"
          icon={<FaApple size={16} />}
        />

        <div style={{ margin: "20px" }} />

        {/* Continue with Google */}
        <CustomButton
          label="Continue with Google"
          width={"100%"}
          height="55px"
          bgColor="white"
          borderColor="#DFDFDF"
          borderWidth="1px"
          icon={<FcGoogle size={16} />}
        />
      </div>
    </>
  );
};

export default LoginForm;

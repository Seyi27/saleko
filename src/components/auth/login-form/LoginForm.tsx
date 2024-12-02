import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

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
    <div className="login_form_container">
      <p className="login_text">Login</p>

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
        />

        <div style={{ margin: "20px" }} />

        <Link to="/forgot-password" className="forgot_password">
          <p>Forgot Password?</p>
        </Link>

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

      {/* Form Divider */}
      <div className="form_divider">
        <hr
          style={{ width: "100%", marginRight: "20px", marginLeft: "20px" }}
        />
        <p>Or</p>
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
  );
};

export default LoginForm;

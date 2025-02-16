import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import encrypted_ic from "../../../assets/images/svg/encrypted_ic.svg";
import { AuthModalScreenProps } from "../../../types/types";
import { useLoginMutation } from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../../slice/userDetailsSlice";
import { ToastContainer, toast } from "react-toastify";
import { showCustomToast } from "../../custom-toast/CustomToast";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const LoginForm = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  // const [customErrorText, setCustomErrorText] = useState("");

  const [textError, setTextError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [focusedTextinput, setFocusedTextinput] = useState(false);

  const dispatch = useDispatch();

  const [login, { data, isSuccess, isError, error, isLoading }] =
    useLoginMutation();

  console.log("login data", data);

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
      dispatch(addUser(data.data));
      setText("");
      setPassword("");
    }

    if (isError && error) {
      if ("status" in error) {
        setFocusedTextinput(false); // to remove the placeholder when there is an error

        if (error.status == 401 || error.status == 422) {
          // setCustomErrorText("Incorrect password");

          showCustomToast({
            message: "Error! Please check your credentials and try again..",
            type: "error",
          });

          setText("");
          setPassword("");
        }
      }
    }
  }, [data, isSuccess, isError]);

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "text":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const phoneRegex = /^\d{1,11}$/;
        const phoneRegex = /^\+234\d{10}$/;

        setText(e.trim());
        // setCustomErrorText(""); // to remove any text when typing
        if (!e.trim()) {
          setTextError("Field cannot be empty");
        } else if (!emailRegex.test(e.trim()) && !phoneRegex.test(e.trim())) {
          setTextError("Enter a valid email or phone number.");
        } else {
          setTextError(""); // Clear the error
        }
        break;
      case "password":
        setPassword(e.trim());
        // setCustomErrorText(""); // to remove any text when typing
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
    if (text && password && !textError && !passwordError) {
      setButtonDisabled(false); // Enable button
    } else {
      setButtonDisabled(true); // Disable button
    }
  };

  // Trigger form validation whenever any input changes
  useEffect(() => {
    checkFormValidity();
  }, [text, password, textError, passwordError]);

  const handleSubmit = (e: React.FormEvent) => {
    login({
      username: text,
      password: password,
    });

    e.preventDefault();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log("codeResponse", codeResponse),
    onError: (errorResponse) => console.log("errorResponse", errorResponse),
    flow: "auth-code",
  });

  const handleSuccess = async (response: any) => {
    console.log("Google Login Success:", response);

    // Send the token to the backend
    const res = await fetch(`https://staging.saleko.ng/api/auth-svc/auth/social/callback/google?token=${response.credential}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ token: response.credential }),
    });

    const data = await res.json();
    console.log("Backend Response:", data);
  };

  return (
    <>
      <CloseModalContainer cancelIconOnly handleCloseModal={handleCloseModal} />

      <div className="login_form_container">
        <p className="login_text">Login</p>
        <p className="data_encrypted_text">
          <img src={encrypted_ic} />
          All data will be encrypted
        </p>
        <form onSubmit={handleSubmit} className="">
          {/* Email Address or Phone Number* */}
          <CustomTextInput
            type={"normal"}
            name={"text"}
            value={text}
            label={"Email Address or Phone Number*"}
            errorMessage={textError}
            idAndHtmlFor={"textInput"}
            handleTextInput={handleTextInput}
            placeholder="e.g johndoe@gmail.com or +2348177777777"
            focused={focusedTextinput}
            setFocused={setFocusedTextinput}
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

          {/* {customErrorText && !passwordError && (
            <p className="customErrorText">{customErrorText}</p>
          )} */}

          <div style={{ margin: "15px" }} />

          <div
            className="forgot_password"
            onClick={() => handleAuthNavigate("forgot_password_request")}
          >
            <p>Forgot Password?</p>
          </div>

          <div style={{ margin: "15px" }} />

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
            loader={isLoading}
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
        <div style={{ margin: "20px" }} />
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
        <div style={{ margin: "15px" }} />
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
          // onClick={()=> googleLogin()}
        />

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("credentialResponse", credentialResponse.credential);
            handleSuccess(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
};

export default LoginForm;

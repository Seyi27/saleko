import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import encrypted_ic from "../../../assets/images/svg/encrypted_ic.svg";
import { AuthModalScreenProps } from "../../../types/types";
import {
  useAppleAuthCallbackMutation,
  useGoogleAuthCallbackMutation,
  useLoginMutation,
} from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../../slice/userDetailsSlice";
import { ToastContainer, toast } from "react-toastify";
import { showCustomToast } from "../../custom-toast/CustomToast";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import AppleLogin from "react-apple-login";
import AppleSignin from "react-apple-signin-auth";
import { getAuth, signInWithPopup, OAuthProvider, signInWithRedirect } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

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

  const [login, { isLoading }] = useLoginMutation();

  const [googleAuthCallback] = useGoogleAuthCallbackMutation();

  const [appleAuthCallback] = useAppleAuthCallbackMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        username: text,
        password: password,
      }).unwrap();

      if (response) {
        handleCloseModal();
        dispatch(addUser(response.data));
        setText("");
        setPassword("");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        showCustomToast({
          message: error.data.message,
          type: "error",
        });
      } else if (error?.status === 422) {
        showCustomToast({
          message: "Error! Please check your credentials and try again..",
          type: "error",
        });
      } else {
        showCustomToast({
          message:
            "Error! Please check you internet connection and try again..",
          type: "error",
        });
      }

      setText("");
      setPassword("");
      setFocusedTextinput(false); // to remove the placeholder when there is an error
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      handleGoogleSuccess(codeResponse.access_token);
    },
    onError: (errorResponse) => {
      showCustomToast({
        message: "Error! Please check your credentials and try again..",
        type: "error",
      });
    },
    flow: "implicit",
  });

  const handleGoogleSuccess = async (response: string) => {
    try {
      const googleCallbackBody = {
        channel: "web",
        token: response,
      };
      const res = await googleAuthCallback(googleCallbackBody).unwrap(); // forces the mutation to return a raw response or throw an error.
      if (res) {
        dispatch(addUser(res.data));
        handleCloseModal();
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
    }
  };

  const handleAppleSignIn = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new OAuthProvider("apple.com");

    try {
      const result = await signInWithPopup(auth, provider);

      // Retrieve the accessToken
      const credential = OAuthProvider.credentialFromResult(result);
      const idToken = credential?.idToken; // Use this for backend verification

      if (idToken) {
        const appleCallbackBody = {
          channel: "web",
          token: idToken,
        };

        const res = await appleAuthCallback(appleCallbackBody).unwrap();

        if (res) {
          dispatch(addUser(res.data));
          handleCloseModal();
        }
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
    }
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
        {/* <AppleSignin
          authOptions={{
            clientId: "com.saleko.salekoweb", // Service ID from Apple Developer
            redirectURI: "https://newdev.saleko.ng",
            scope: "email name", // Permissions required
            usePopup: false,
          }}
          uiType="dark" // "dark", "light", or "white"
          onSuccess={(response: any) =>
            console.log("Apple SignIn Success:", response)
          }
          onError={(error: any) => console.error("Apple SignIn Error:", error)}
          render={(props: any) => {
            return (
              <CustomButton
                label="Continue with Apple"
                width={"100%"}
                height="55px"
                bgColor="white"
                borderColor="#DFDFDF"
                borderWidth="1px"
                fontSize={14}
                icon={<FaApple size={24} />}
                onClick={props.onClick} // Ensure Apple Sign-In is triggered
              />
            );
          }}
        /> */}

        {/* Continue with Apple */}
        <CustomButton
          label="Continue with Apple"
          width={"100%"}
          height="55px"
          bgColor="white"
          borderColor="#DFDFDF"
          borderWidth="1px"
          fontSize={14}
          icon={<FaApple size={24} />}
          onClick={handleAppleSignIn} // Ensure Apple Sign-In is triggered
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
          fontSize={14}
          icon={<FcGoogle size={24} />}
          onClick={() => googleLogin()}
        />

        {/* <AppleLogin
          clientId="com.saleko.salekoweb"
          redirectURI="https://newdev.saleko.ng"
          responseType={"code"} 
          responseMode={"query"}  
          usePopup={false} 
        /> */}
      </div>
    </>
  );
};

export default LoginForm;

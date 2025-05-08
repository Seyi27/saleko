import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CreateAccount.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { countryCallingCodes } from "../../../helpers/CountryCallingCodes";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import {
  useAppleAuthCallbackMutation,
  useGoogleAuthCallbackMutation,
  useSignUpMutation,
} from "../../../services/authApi";
import { Audio, ColorRing, TailSpin } from "react-loader-spinner";
import { BsChevronLeft, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmailPhonenumberText,
  addSelectedDropdownValue,
} from "../../../slice/authValueSlice";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import encrypted_ic from "../../../assets/images/svg/encrypted_ic.svg";
import { AuthModalScreenProps } from "../../../types/types";
import { addCreateAccountDataValues } from "../../../slice/createAccountDataSlice";
import { showCustomToast } from "../../custom-toast/CustomToast";
import { RootState } from "../../../store/store";
import { useGoogleLogin } from "@react-oauth/google";
import { addUser } from "../../../slice/userDetailsSlice";
import {
  getAuth,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const CreateAccount = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [selectedDropdownKey, setSelectedDropdownKey] = useState("");
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");

  const [selectedCode, setSelectedCode] = useState("+234");

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [focusedTextinput, setFocusedTextinput] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const [googleAuthCallback] = useGoogleAuthCallbackMutation();

  const [appleAuthCallback] = useAppleAuthCallbackMutation();

  const dispatch = useDispatch();

  const handleDropdownChange = (key: string, value: string) => {
    setSelectedDropdownKey(key);
    setSelectedDropdownValue(value);
    setDropdownToggle(false);

    dispatch(addSelectedDropdownValue(key));
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "phone":
        if (!e.trim()) {
          setPhoneNo("");
          setPhoneNoError("Phone Number cannot be empty");
        } else if (/^\d+$/.test(e.trim())) {
          // takes only numbers
          setPhoneNo(e.trim());
          setPhoneNoError("");
          dispatch(addEmailPhonenumberText(selectedCode + e.trim()));
        } else {
          setPhoneNoError("");
        }
        break;
      case "email":
        setEmail(e.trim());
        dispatch(addEmailPhonenumberText(e.trim()));
        if (!e.trim()) {
          setEmailError("Email cannot be empty");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())) {
          // if email is not valid
          setEmailError("Email is not valid");
        } else {
          setEmailError("");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedDropdownKey === "phone" && phoneNo && !phoneNoError) {
      setButtonDisabled(false);
    } else if (selectedDropdownKey === "email" && email && !emailError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedDropdownKey, emailError, phoneNoError, email, phoneNo]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      if (selectedDropdownKey) {
        const phoneNoWithCountryCode = selectedCode + phoneNo;

        const response = await signUp({
          username:
            selectedDropdownKey == "email" ? email : phoneNoWithCountryCode,
          mode: selectedDropdownKey == "email" ? "email" : "phone_number",
        }).unwrap();

        if (response) {
          const submitvalue = {
            user_id: response.data.user_id,
            notification_reference: response.data.notification_reference,
          };

          dispatch(addCreateAccountDataValues(submitvalue));
          handleAuthNavigate("verify_account");
        }
      }
    } catch (error: any) {
      if (error?.status === 422) {
        setFocusedTextinput(false);

        if (selectedDropdownKey == "email") {
          showCustomToast({
            message: "The email has already been taken.",
            type: "error",
          });
          setEmail("");
        } else if (selectedDropdownKey == "phone") {
          showCustomToast({
            message: "The phone number has already been taken.",
            type: "error",
          });
          setPhoneNo("");
        }
      }
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
      dispatch(addUser(res.data));
      handleCloseModal();
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

      if (result) {
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

      <div className="create_form_container">
        <p className="create_account_text">Create Account</p>
        <p className="otp_verify_text">
          We will send an OTP verification to you
        </p>

        <p className="data_encrypted_text">
          <img src={encrypted_ic} />
          All data will be encrypted
        </p>

        <form onSubmit={handleSubmit} className="create_account_form">
          <CustomTextInput
            type={"dropdown"}
            name={"dropdown"}
            value={selectedDropdownValue}
            label={"Email or Phone No.*"}
            // errorMessage={""}
            idAndHtmlFor={"input_dropdown"}
            handleTextInput={handleTextInput}
            handleDropdown={() => setDropdownToggle((prevState) => !prevState)}
          />

          {dropdownToggle ? (
            <div className="dropdown_container">
              <p onClick={() => handleDropdownChange("email", "Email Address")}>
                Email Address
              </p>
              <p onClick={() => handleDropdownChange("phone", "Phone Number")}>
                Phone Number
              </p>
            </div>
          ) : null}

          {selectedDropdownKey ? (
            selectedDropdownKey == "phone" ? (
              <CustomTextInput
                type={"phoneNo"}
                name={"phone"}
                value={phoneNo}
                label={"Phone Number"}
                errorMessage={phoneNoError}
                idAndHtmlFor={"phone_input"}
                selectedCode={selectedCode}
                setSelectedCode={setSelectedCode}
                handleTextInput={handleTextInput}
                placeholder="e.g 8147999999"
                focused={focusedTextinput}
                setFocused={setFocusedTextinput}
              />
            ) : (
              <CustomTextInput
                type={"normal"}
                name={"email"}
                value={email}
                label={"Enter your email"}
                errorMessage={emailError}
                idAndHtmlFor={"email_input"}
                handleTextInput={handleTextInput}
              />
            )
          ) : null}

          <div style={{ margin: "20px" }} />

          {/* Send Code Button */}
          <CustomButton
            label="Send Code"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            loader={isLoading}
            disabled={buttonDisabled}
            onClick={handleSubmit}
          />

          <div className="have_an_account_container">
            <p>
              Already have an account?{" "}
              <span onClick={() => handleAuthNavigate("login_form")}>
                Login
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

          <div style={{ margin: "2px" }} />

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
            onClick={handleAppleSignIn}
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
        </form>
      </div>
    </>
  );
};

export default CreateAccount;

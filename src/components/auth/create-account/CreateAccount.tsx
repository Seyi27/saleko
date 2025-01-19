import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CreateAccount.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { countryCallingCodes } from "../../../helpers/CountryCallingCodes";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import { useSignUpMutation } from "../../../services/authApi";
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
import { addCreateAccountData } from "../../../slice/createAccountDataSlice";

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

  const [dropdownToggle, setDropdownToggle] = useState(false);

  const [signUp, { data, isSuccess, isLoading, isError, error }] =
    useSignUpMutation();

  const dispatch = useDispatch();

  const handleDropdownChange = (key: string, value: string) => {
    setSelectedDropdownKey(key);
    setSelectedDropdownValue(value);
    setDropdownToggle(false);

    dispatch(addSelectedDropdownValue(key));
  };

  console.log("data data", data);

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "phone":
        setPhoneNo(e.trim());
        dispatch(addEmailPhonenumberText(e.trim()));
        if (!e.trim()) {
          setPhoneNoError("Phone Number cannot be empty");
        } else if (!/^\d+$/.test(e.trim())) {
          // if it is not numbers
          setPhoneNoError("Phone Number is not valid");
        } else if (!/^\d{11}$/.test(e.trim())) {
          setPhoneNoError("Invalid phone number format");
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

  useEffect(() => {
    if (isSuccess) {
      const submitvalue = {
        user: data.data.user,
        notification_reference: data.data.notification_reference,
      };

      dispatch(addCreateAccountData(submitvalue));
      handleAuthNavigate("verify_account");
    } else if (isError && error) {
      console.log("error", error);
    }
  }, [data, isSuccess, isError, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signUp({
      username: selectedDropdownKey == "email" ? email : phoneNo,
      mode: selectedDropdownKey == "email" ? "email" : "phone_number",
    });
  };

  return (
    <>
      <CloseModalContainer
        cancelIconOnly
        handleCloseModal={handleCloseModal}
      />

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
                label={"Phone Number*"}
                errorMessage={phoneNoError}
                idAndHtmlFor={"phone_input"}
                handleTextInput={handleTextInput}
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
        </form>
      </div>
    </>
  );
};

export default CreateAccount;

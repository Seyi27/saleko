import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CreateAccount.css";
import CustomButton from "../../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { countryCallingCodes } from "../../../helpers/CountryCallingCodes";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [selectedDropdownKey, setSelectedDropdownKey] = useState("");
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [emailPhoneText, setEmailPhoneText] = useState("");

  const [dropdownToggle, setDropdownToggle] = useState(false);

  const navigate = useNavigate();

  const handleDropdownChange = (key: string, value: string) => {
    setSelectedDropdownKey(key);
    setSelectedDropdownValue(value);
    setDropdownToggle(false);
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "phone":
        setPhoneNo(e.trim());
        setEmailPhoneText(e.trim());
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
        setEmailPhoneText(e.trim());
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

  const handleSubmit = (e: React.FormEvent) => {
    const routeData = {
      selectedValue: selectedDropdownKey,
      emailPhoneText: emailPhoneText,
    };

    e.preventDefault();
    navigate("/sign-up/verification", { state: routeData });
  };

  // Reference to the dropdown container
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownToggle(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="create_form_container">
      <p className="create_account_text">Create Account</p>
      <p className="otp_verify_text">We will send an OTP verification to you</p>

      <form onSubmit={handleSubmit}>
        <CustomTextInput
          type={"dropdown"}
          name={"dropdown"}
          value={selectedDropdownValue}
          label={"Email or Phone No.*"}
          // errorMessage={""}
          idAndHtmlFor={"input_dropdown"}
          handleTextInput={handleTextInput}
          handleDropdown={() => setDropdownToggle(!dropdownToggle)}
        />

        {dropdownToggle ? (
          <div className="dropdown_container" ref={dropdownRef}>
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
          disabled={buttonDisabled}
          onClick={handleSubmit}
        />

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
      </form>
    </div>
  );
};

export default CreateAccount;

import React, { useState } from "react";
import "./CustomTextInput.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { countryCallingCodes } from "../../helpers/CountryCallingCodes";
import PasswordChecklist from "react-password-checklist";
import { CustomTextInputProps } from "../../types/types";

const CustomTextInput = ({
  type,
  name,
  value,
  label,
  errorMessage,
  idAndHtmlFor,
  handleTextInput,
}: CustomTextInputProps) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+234");

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
  };

  const handleSelectionChange = (e: any) => {
    setSelectedCode(e.target.value);
  };

  const renderCustomInput = () => {
    switch (type) {
      case "normal":
        return (
          <div className="normal_input_box">
            <input
              id={idAndHtmlFor}
              type="text"
              value={value}
              onChange={(e) => handleTextInput(name, e.target.value)}
              className={`normal_textinput ${
                errorMessage && "error_textInput"
              }`}
            />
            <label
              htmlFor={idAndHtmlFor}
              className={`${value.length > 0 ? "normal_label" : ""}  ${
                errorMessage ? "error_label" : ""
              }`}
            >
              {label}
            </label>
            {errorMessage && (
              <span className="error_message">{errorMessage}</span>
            )}
          </div>
        );
      case "phoneNo":
        return (
          <div className="custom_input_box">
            <div
              className={`custom_textinput_container ${
                errorMessage && "error_textInput"
              }`}
            >
              <select
                id="country-code"
                value={selectedCode}
                onChange={handleSelectionChange}
                style={{
                  padding: "5px",
                  margin: "10px 0",
                  backgroundColor: "#084c3f",
                  borderRadius: "3px",
                  color: "white",
                  border: "none",
                  outline: "none",
                }}
              >
                {countryCallingCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>

              <input
                id={idAndHtmlFor}
                type="text"
                value={value}
                onChange={(e) => handleTextInput(name, e.target.value)}
                className={`custom_textinput ${
                  errorMessage && "error_textInput"
                }`}
                maxLength={11}
              />
            </div>
            <label
              htmlFor={idAndHtmlFor}
              className={`label_text ${
                value.length == 0 ? "" : "custom_label"
              } ${errorMessage && "error_label"}`}
            >
              {label}
            </label>
            {errorMessage && (
              <span className="error_message">{errorMessage}</span>
            )}
          </div>
        );
        break;
      case "password":
        return (
          <>
            <div className="password_input_box">
              <div
                className={`password_textinput_container ${
                  errorMessage && "error_textInput"
                }`}
              >
                <input
                  id="passwordInput"
                  type={toggleVisibility ? "text" : "password"}
                  value={value}
                  onChange={(e) => handleTextInput(name, e.target.value)}
                  className="password_textinput"
                />
                <span onClick={handleToggle}>
                  {toggleVisibility ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
              <label
                htmlFor="passwordInput"
                className={`${value.length > 0 ? "password_label" : ""}  ${
                  errorMessage ? "error_label" : ""
                }`}
              >
                {label}
              </label>
              {errorMessage && (
                <span className="error_message">{errorMessage}</span>
              )}
            </div>

            {/* Password Checklist */}
            {value && (
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
                  value={value}
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
          </>
        );
    }
  };
  return <>{renderCustomInput()}</>;
};

export default CustomTextInput;
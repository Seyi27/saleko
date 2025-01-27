import React, { useState } from "react";
import "./CustomTextInput.css";
import { FiChevronDown, FiEye, FiEyeOff } from "react-icons/fi";
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
  handleDropdown,
  noPasswordChecklist,
  selectedCode,
  setSelectedCode,
  placeholder
}: CustomTextInputProps) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
  };

  const handleSelectionChange = (e: any) => {
    setSelectedCode?.(e.target.value);
  };

  const renderCustomInput = () => {
    switch (type) {
      case "normal":
        return (
          <div
            className="normal_input_box"
          >
            <input
              id={idAndHtmlFor}
              type="text"
              value={value}
              onChange={(e) => handleTextInput(name, e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={(e) => setFocused(e.target.value !== "")}
              className={`normal_textinput ${
                errorMessage && "error_textInput"
              }`}
              placeholder={focused ? placeholder : ""}
            />
            <label
              htmlFor={idAndHtmlFor}
              className={`normal_textinput_label ${value.length > 0 ? "normal_floating_label" : ""}  ${
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
                className={`custom_textinput`}
                onFocus={() => setFocused(true)}
                onBlur={(e) => setFocused(e.target.value !== "")}
                maxLength={10}
                placeholder={focused ? placeholder : ""}
                />
            </div>
            <label
              htmlFor={idAndHtmlFor}
              className={`phoneNo_label_text ${
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
                  id={idAndHtmlFor}
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
                htmlFor={idAndHtmlFor}
                className={`normal_textinput_label ${value.length > 0 ? "password_floating_label" : ""}  ${
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
            {value && !noPasswordChecklist && (
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
      case "dropdown":
        return (
          <>
            <div className="password_input_box">
              <div
                className={`password_textinput_container ${
                  errorMessage && "error_textInput"
                }`}
                onClick={handleDropdown}
              >
                <p className="password_textinput">{value}</p>
                <span onClick={handleToggle}>
                  <FiChevronDown />
                </span>
              </div>
              <label
                className={`normal_textinput_label ${value.length > 0 ? "password_floating_label" : ""}  ${
                  errorMessage ? "error_label" : ""
                }`}
                onClick={handleDropdown}
              >
                {label}
              </label>
              {/* {errorMessage && (
                <span className="error_message">{errorMessage}</span>
              )} */}
            </div>
          </>
        );
    }
  };
  return <>{renderCustomInput()}</>;
};

export default CustomTextInput;

import React, { useEffect, useState } from "react";
import "./PersonalDetailsPage.css";
import CustomButton from "../../../components/custom-button/CustomButton";
import { BiEdit, BiLock } from "react-icons/bi";
import { BsArrowLeft, BsCopy, BsLockFill } from "react-icons/bs";
import CustomTextInput from "../../../components/custom-textInput/CustomTextInput";

const PersonalDetailsPage = () => {
  const [view, setView] = useState<"user_profile" | "edit_profile">(
    "user_profile"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    firstName: "Abiodun",
    lastName: "Ogunsola",
    phoneNumber: "2348108791437",
    email: "abiodunoluwajiyon7@gmail.com",
    homeAddress: "27 Cole Street, Fadeyi",
    DateOfBirth: "1998-12-24",
    gender: "Male",
    accountCreated: "03/04/2024",
    referralCode: "SALAO8312",
  });

  const [editProfileformData, setEditProfileformData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    DateOfBirth: "",
    homeAddress: "",
    preferredLanguage: "",
  });

  const [editProfileformDataError, setEditProfileformDataError] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
    emailError: "",
    genderError: "",
    DateOfBirthError: "",
    homeAddressError: "",
    preferredLanguageError: "",
  });

  const handleTextInput=()=>{ }

  // Update the state when the window resizes
  useEffect(() => {
    // Function to update the state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener when the component unmounts
    };
  }, []);

  const renderUserProfile = () => (
    <div className="profile_outlet_wrapper">
      <div className="profile_outlet_header_container">
        <span className="profile_outlet_header_text">Personal Details</span>
        <CustomButton
          label="Edit Profile"
          width={windowWidth > 600 ? "12%" : "40%"}
          height="35px"
          bgColor="#084C3F"
          textColor="white"
          fontSize={12}
          fontWeight={600}
          icon={<BiEdit size={15} />}
          borderRadius="6px"
          onClick={() => setView("edit_profile")}
        />{" "}
      </div>

      <div className="profile_outlet_body_container">
        <div className="pd_form_row_container">
          {/* First Name */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="pd_form_input"
              value={formData.firstName}
              readOnly
            />
          </div>

          {/* Last Name */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="pd_form_input"
              value={formData.lastName}
              readOnly
            />
          </div>
        </div>

        <div style={{ padding: "10px" }} />

        {/* Phone Number and Email Address */}
        <div className="pd_form_row_container">
          {/* Phone Number */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Phone Number</label>
            <div className="pd_form_input_row_container">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                readOnly
              />

              <div className="verified_style">Verified</div>
            </div>
          </div>

          {/* Email Address */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Email Address</label>
            <input
              type="text"
              name="email"
              className="pd_form_input"
              value={formData.email}
              readOnly
            />
          </div>
        </div>

        <div style={{ padding: "10px" }} />

        {/* Home Address and Date of Birth */}
        <div className="pd_form_row_container">
          {/* Home Address */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Home Address</label>
            <input
              type="text"
              name="homeAddress"
              className="pd_form_input"
              value={formData.homeAddress}
              readOnly
            />
          </div>

          {/* Date of Birth */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Date of Birth</label>
            <input
              type="text"
              name="DateOfBirth"
              className="pd_form_input"
              value={formData.DateOfBirth}
              readOnly
            />
          </div>
        </div>

        <div style={{ padding: "10px" }} />

        {/* Gender and Account Created */}
        <div className="pd_form_row_container">
          {/* Gender */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Gender</label>
            <input
              type="text"
              name="gender"
              className="pd_form_input"
              value={formData.gender}
              readOnly
            />
          </div>

          {/* Account Created */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Account Created</label>
            <input
              type="text"
              name="accountCreated"
              className="pd_form_input"
              value={formData.accountCreated}
              readOnly
            />
          </div>
        </div>

        <div style={{ padding: "10px" }} />

        {/* Referral Code */}
        <div className="pd_form_row_container">
          {/* Referral Code */}
          <div style={{ width: "100%" }}>
            <label className="pd_form_label">Referral Code</label>
            <div className="pd_form_input_row_container">
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                readOnly
              />
              <div style={{ cursor: "pointer" }}>
                <BsCopy color="#084c3f" />
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}></div>
        </div>
      </div>
    </div>
  );

  const renderEditProfile = () => (
    <>
      <div className="profile_outlet_wrapper">
        <div className="profile_outlet_header_container">
          <div
            className="edit_profile_header_container"
            onClick={() => setView("user_profile")}
          >
            <BsArrowLeft />
            <span className="profile_outlet_header_text">Edit Profile</span>
          </div>
          <CustomButton
            label="Change Password"
            width={windowWidth > 600 ? "20%" : "40%"}
            height="35px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={12}
            fontWeight={600}
            icon={<BsLockFill size={15} />}
            borderRadius="6px"
          />{" "}
        </div>

        <div className="profile_outlet_body_container">
          {/* user container */}
          <div className="edit_profile_username_container">
            <div className="edit_profile_username_avatar"></div>

            <div>
              <div className="edit_profile_username_verified">
                <p>Abiodun Ogunsola</p>
                <div className="verified_style">Verified</div>
              </div>
              <span>abiodunoluwajiyon7@gmail.com</span>
            </div>
          </div>

          {/* form container */}
          {/* <div>
            <div>
              <CustomTextInput
                type={"normal"}
                name={"email"}
                value={editProfileformData.email}
                label={"Enter your email"}
                errorMessage={editProfileformDataError.emailError}
                idAndHtmlFor={"email_input"}
                handleTextInput={handleTextInput}
              />
            </div>
          </div> */}

          {/* checkbox container */}
          <span
            className="edit_profile_checkbox_text1"
            style={{ color: "black", fontSize: "14px" }}
          >
            Notification Preferences{" "}
          </span>

          <div className="edit_profile_checkbox_container">
            <input type="checkbox" style={{ accentColor: "#084c3f" }} />

            <div>
              <span className="edit_profile_checkbox_text1">
                Email Notifications
              </span>
              <p className="edit_profile_checkbox_text2">
                Receive emails about your orders, promotions, and marketplace
                updates{" "}
              </p>
            </div>
          </div>

          <div className="edit_profile_checkbox_container">
            <input type="checkbox" style={{ accentColor: "#084c3f" }} />

            <div>
              <span className="edit_profile_checkbox_text1">
                SMS Notifications{" "}
              </span>
              <p className="edit_profile_checkbox_text2">
                Receive text messages for order status updates and
                time-sensitive alerts
              </p>
            </div>
          </div>

          <div className="edit_profile_checkbox_container">
            <input type="checkbox" style={{ accentColor: "#084c3f" }} />

            <div>
              <span className="edit_profile_checkbox_text1">
                Promotional Messages{" "}
              </span>
              <p className="edit_profile_checkbox_text2">
                Receive special offers, promotions, and marketing communications
              </p>
            </div>
          </div>

          {/* button container */}
          <div className="edit_profile_button_container">
            <CustomButton
              label="Cancel"
              width={windowWidth > 600 ? "10%" : "30%"}
              height="35px"
              bgColor="white"
              textColor="#374151"
              fontSize={12}
              fontWeight={600}
              borderRadius="6px"
              borderColor="#D1D5DB"
              borderWidth={"1px"}
            />

            <CustomButton
              label="Save Changes"
              width={windowWidth > 600 ? "15%" : "40%"}
              height="35px"
              bgColor="#084c3f"
              textColor="white"
              fontSize={12}
              fontWeight={600}
              borderRadius="6px"
              // disabled={!isFormValid}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "15px" }} />

      {/* Account security */}
      <div className="profile_outlet_wrapper">
        <div className="profile_outlet_header_container">
          <span className="profile_outlet_header_text">Account Security</span>
        </div>

        <div className="profile_outlet_body_container">
          {/* Two-Factor Authentication */}
          <div className="account_security_item_wrapper">
            <div>
              <p className="account_security_item_text1">
                Two-Factor Authentication
              </p>
              <p className="account_security_item_text2">
                Add an extra layer of security to your account
              </p>
            </div>

            <div className="account_security_button_container">
              <CustomButton
                label="Not Enabled"
                width={windowWidth > 600 ? "150px" : "100px"}
                height="35px"
                bgColor="white"
                textColor="#DC2626"
                fontSize={12}
                fontWeight={600}
                borderRadius="6px"
              />{" "}
              <CustomButton
                label="Enable"
                width={"150px"}
                height="35px"
                bgColor="#084C3F"
                textColor="white"
                fontSize={12}
                fontWeight={600}
                borderRadius="6px"
              />{" "}
            </div>
          </div>

          <div style={{ padding: "12px" }} />

          {/* Login Sessions  */}
          <div className="account_security_item_wrapper">
            <div>
              <p className="account_security_item_text1">Login Sessions </p>
              <p className="account_security_item_text2">
                Manage devices where you're currently logged in{" "}
              </p>
            </div>

            <div>
              <CustomButton
                label="Manage Sessions"
                width={"150px"}
                height="35px"
                bgColor="white"
                textColor="#374151"
                fontSize={12}
                fontWeight={600}
                borderRadius="6px"
                borderWidth="1px"
                borderColor="#D1D5DB"
              />{" "}
            </div>
          </div>

          <div style={{ padding: "12px" }} />

          {/* Delete Account  */}
          <div className="account_security_item_wrapper">
            <div>
              <p className="account_security_item_text1">Delete Account</p>
              <p className="account_security_item_text2">
                Permanently delete your account and all your data{" "}
              </p>
            </div>

            <div>
              <CustomButton
                label="Delete Account"
                width={"150px"}
                height="35px"
                bgColor="white"
                textColor="#B91C1C"
                fontSize={12}
                fontWeight={600}
                borderRadius="6px"
                borderWidth="1px"
                borderColor="#FCA5A5"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ width: "100%" }}>
      {view == "user_profile" && renderUserProfile()}
      {view == "edit_profile" && renderEditProfile()}
    </div>
  );
};

export default PersonalDetailsPage;

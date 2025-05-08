import React, { useState } from "react";
import "./ContactUsPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import CustomButton from "../../../components/custom-button/CustomButton";
import phone_white from "../../../assets/images/svg/phone_white.svg";
import whatsapp_white from "../../../assets/images/svg/whatsapp_white.svg";
import mail_white from "../../../assets/images/svg/mail_white.svg";
import facebook_white from "../../../assets/images/svg/facebook_white.svg";
import instagram_white from "../../../assets/images/svg/instagram_white.svg";
import x_white from "../../../assets/images/svg/x_white.svg";
import tiktok_white from "../../../assets/images/svg/tiktok_white.svg";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [contactError, setContactError] = useState("");

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "name":
        if (!e.trim()) {
          setName("");
          setNameError("Name cannot be empty");
        } else if (/^[A-Za-z]+$/.test(e.trim())) {
          setName(e.trim());
          setNameError("");
        } else {
          setNameError("");
        }
        break;
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
      case "phone":
        if (!e.trim()) {
          setPhoneNumber("");
          setPhoneNumberError("Phone Number cannot be empty");
        } else if (/^\d+$/.test(e.trim())) {
          // takes only numbers
          setPhoneNumber(e.trim());
          setPhoneNumberError("");
        } else {
          setPhoneNumberError("");
        }
        break;
      case "message":
        if (!e.trim()) {
          setMessage("");
          setMessageError("Message cannot be empty");
        } else {
          setMessage(e.trim());
          setMessageError("");
        }
        break;
      case "contact":
        if (!e.trim()) {
          setContactError("Contact cannot be empty");
        } else {
          setContact(e.trim());
          setContactError("");
        }
        break;
      default:
        break;
    }
  };

  return (
    <PageWrapper classname="contact_us_container">
      <p className="contact_us_title">Contact Us</p>

      <div className="contact_us_content_wrapper">
        {/* Left container */}
        <div className="contact_us_left_container">
          <p className="contact_us_header_title">Get in touch</p>

          <div>
            <label className="contact_us_label">Name</label>
            <br></br>
            <input
              type="text"
              value={name}
              onChange={(e) => handleTextInput("name", e.target.value)}
              className="contact_us_textinput"
            />
            {nameError && <p className="error_text">{nameError}</p>}
          </div>

          <div style={{ padding: "5px" }} />

          {/* Email Address row container */}
          <div className="email_phone_row_container">
            {/* Email Address */}
            <div style={{ width: "100%" }}>
              <label className="contact_us_label">Email Address</label>
              <br></br>
              <input
                type="email"
                value={email}
                onChange={(e) => handleTextInput("email", e.target.value)}
                placeholder="youremail@example.com"
                className="contact_us_textinput"
              />
              {emailError && <p className="error_text">{emailError}</p>}
            </div>

            {/* Phone Number */}
            <div style={{ width: "100%" }}>
              <label className="contact_us_label">Phone Number</label>
              <br></br>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => handleTextInput("phone", e.target.value)}
                placeholder="+234-(00 000 0000)"
                className="contact_us_textinput"
              />
              {phoneNumberError && (
                <p className="error_text">{phoneNumberError}</p>
              )}
            </div>
          </div>

          <div style={{ padding: "5px" }} />

          {/* Message */}
          <div>
            <label className="contact_us_label">Message</label>
            <br></br>
            <textarea
              value={message}
              onChange={(e) => handleTextInput("message", e.target.value)}
              className="contact_us_textarea"
              rows={5}
            ></textarea>
            {messageError && <p className="error_text">{messageError}</p>}
          </div>

          <div style={{ padding: "5px" }} />

          {/* Radio button container */}
          <div>
            <p className="contact_us_label">
              How do you prefer we contact you?
            </p>

            <div className="contact_us_radio_container_wrapper">
              <div className="contact_us_radio_container">
                <input
                  type="radio"
                  name="contact"
                  value="phoneNumber"
                  checked={contact === "phoneNumber"}
                  onChange={(e) => handleTextInput("contact", e.target.value)}
                />
                <label className="contact_us_label">Phone Number</label>
              </div>

              <div className="contact_us_radio_container">
                <input
                  type="radio"
                  name="contact"
                  value="email"
                  checked={contact === "email"}
                  onChange={(e) => handleTextInput("contact", e.target.value)}
                />
                <label className="contact_us_label">Email</label>
              </div>
              {contactError && <p className="error_text">{contactError}</p>}
            </div>
          </div>

          <div style={{ padding: "5px" }} />

          <CustomButton
            label="Submit"
            width={"100%"}
            height="40px"
            bgColor="#084C3F"
            textColor="white"
            borderColor="#DFDFDF"
            borderRadius="20px"
            fontSize={14}
            fontWeight={600}
          />
        </div>

        {/* Right container */}
        <div className="contact_us_right_container">
          <p>We are always here to help you</p>

          <div className="contact_us_icon_container">
            <img src={phone_white} />
            <p>02018891693</p>
          </div>

          <div style={{ padding: "5px" }} />

          <div className="contact_us_icon_container">
            <img src={whatsapp_white} />
            <p>07002255725</p>
          </div>

          <div style={{ padding: "5px" }} />

          <div className="contact_us_icon_container">
            <img src={mail_white} />
            <p>support@saleko.ng</p>
          </div>

          <div style={{ padding: "5px" }} />

          <hr className="contact_us_divider" />

          <div style={{ padding: "5px" }} />

          <p style={{ fontWeight: "bold" }}>
            Our dedicated customer support will be available from:
          </p>

          <p>MONDAY-FRIDAY: 9am - 4:30pm WAT</p>

          <p>Connect with us via our social media channels:</p>

          <div className="contact_us_icon_container">
            <img src={instagram_white} />
            <img src={facebook_white} />
            <img src={x_white} />
            <img src={tiktok_white} />
          </div>
        </div>
      </div>

      <div style={{ padding: "15px" }} />
    </PageWrapper>
  );
};

export default ContactUsPage;

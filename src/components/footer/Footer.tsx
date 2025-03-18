import React from "react";
import "./Footer.css";
import SalekoGreyLogo from "../../assets/images/svg/SalekoGreyLogo";
import FacebookIcon from "../../assets/images/svg/FacebookIcon";
import InstagramIcon from "../../assets/images/svg/InstagramIcon";
import LinkedinIcon from "../../assets/images/svg/LinkedinIcon";
import { FaRegEnvelope } from "react-icons/fa";
import PhoneIcon from "../../assets/images/svg/PhoneIcon";
import TwitterXIcon from "../../assets/images/svg/TwitterXIcon";
import GooglePlayBlack from "../../assets/images/svg/GooglePlayBlack";
import AppStoreBlack from "../../assets/images/svg/AppStoreBlack";
import VisaIcon from "../../assets/images/svg/VisaIcon";
import MastercardIcon from "../../assets/images/svg/MastercardIcon";
import VerveIcon from "../../assets/images/svg/VerveIcon";
import PaystackIcon from "../../assets/images/svg/PaystackIcon";
import MonnifyIcon from "../../assets/images/svg/MonnifyIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="body_container footer_container">
      <div className="body_second_container footer_second_container">
        <div className="footer_saleko_container">
          <div className="footer_saleko_logo_container">
            <SalekoGreyLogo />
            <p>Buy Boku, Sell Berekete</p>
          </div>

          <div>
            <div className="footer_input_container">
              <input
                type="email"
                placeholder="Enter your email address"
                className="footer_input"
              />
              <button className="footer_input_button">SEND</button>
            </div>
            <span className="footer_terms_conditions">
              By subscribing you agree to our{" "}
              <span className="footer_green_terms">
                Terms & Conditions and Privacy & Cookies Policy.
              </span>
            </span>
          </div>
        </div>

        <hr style={{ border: "0.5px solid #D1D5DB" }} />

        <div className="footer_details_container">
          <div style={{ paddingTop: "10px" }}>
            <div className="download_app_container">
              <span>Download our app</span>

              <div className="get_app_container">
                <GooglePlayBlack />
                <AppStoreBlack />
              </div>
            </div>

            <div className="follow_socials_container">
              <span>Follow us on social media:</span>
              <div className="social_media_icon_container">
                <div className="social_media_icon">
                  <FacebookIcon />
                </div>
                <div className="social_media_icon_twitter">
                  <TwitterXIcon />
                </div>
                <div className="social_media_icon">
                  <InstagramIcon />
                </div>
                <div className="social_media_icon">
                  <LinkedinIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="footer_info_container">
            <div className="footer_info_section">
              <Link to={"/about-us"} className="footer_info_item">
                About Us
              </Link>
              <Link to={"/contact-us"} className="footer_info_item">
                Contact us
              </Link>
              <Link to={"/privacy-policy"} className="footer_info_item">
                Privacy policy
              </Link>
              <Link to={"/terms-and-conditions"} className="footer_info_item">
                Terms and condition
              </Link>
              <Link to={"/"} className="footer_info_item">
                Watch our video guide
              </Link>
            </div>

            <div className="footer_info_section">
              <Link to={"/"} className="footer_info_item">
                Markets
              </Link>
              <Link to={"/"} className="footer_info_item">
                Create buyer profile{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                How to shop on saleko{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                Track my order{" "}
              </Link>
            </div>

            <div className="footer_info_section">
              <Link to={"/"} className="footer_info_item">
                Become a Seller
              </Link>
              <Link to={"/"} className="footer_info_item">
                Seller guide{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                Advertise with us{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                Apply for a loan{" "}
              </Link>{" "}
            </div>

            <div className="footer_info_section">
              <Link to={"/"} className="footer_info_item">
                FAQs
              </Link>
              <Link to={"/"} className="footer_info_item">
                Disputes{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                Escrow Service{" "}
              </Link>
              <Link to={"/"} className="footer_info_item">
                Pickup Locations{" "}
              </Link>{" "}
            </div>
          </div>

          <div className="footer_info_section">
            <div className="contact_details_container">
              <PhoneIcon />
              <div>
                <p>Monday-Friday: 08am-9pm</p>
                <h3>0 800 300-353</h3>
              </div>
            </div>

            <div className="contact_details_container">
              <FaRegEnvelope size={25} />

              <div>
                <p>Need help with your order?</p>
                <h4>info@example.com</h4>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: "0.5px solid #D1D5DB" }} />

        <div className="bottom_footer_details">
          <div className="bottom_footer_details_image">
            <VisaIcon />
            <MastercardIcon />
            <VerveIcon />
            <PaystackIcon />
            <MonnifyIcon />
          </div>

          <div>
            <p>©2021–2024. All rights </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

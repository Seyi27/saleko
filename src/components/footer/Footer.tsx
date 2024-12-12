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

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_second_container">
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

          <div className="other_footer_details">
            <h4>About Us</h4>
            <p>Contact us</p>
            <p>Privacy policy</p>
            <p>Terms and condition</p>
            <p>Watch our video guide</p>
          </div>

          <div className="other_footer_details">
            <h4>Markets</h4>
            <p>Create buyer profile</p>
            <p>How to shop on saleko</p>
            <p>Track my order</p>
          </div>

          <div className="other_footer_details">
            <h4>Become a Seller</h4>
            <p>Seller guide</p>
            <p>Advertise with us</p>
            <p>Apply for a loan</p>
          </div>

          <div className="other_footer_details">
            <h4>FAQs</h4>
            <p>Disputes</p>
            <p>Escrow Service</p>
            <p>Pickup Locations</p>
          </div>

          <div className="other_footer_details">
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

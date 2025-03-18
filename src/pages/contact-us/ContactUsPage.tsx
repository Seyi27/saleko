import React from "react";
import "./ContactUsPage.css";
import Footer from "../../components/footer/Footer";
import NavCategories from "../../components/nav-categories/NavCategories";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavHeader from "../../components/nav-header/NavHeader";

const ContactUsPage = () => {
  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container contact_us_container">
          <p className="contact_us_title">Contact Us</p>

          <div className="contact_us_content_wrapper">
            <div className="contact_us_left_container">

            </div>

            <div className="contact_us_right_container">
 
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUsPage;

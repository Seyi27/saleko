import React from "react";
import "./DisputesPage.css";
import footer_home_img from "../../../assets/images/svg/footer_home_img.svg";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";

const DisputesPage = () => {
  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container disputes_container">
          <p className="disputes_title">Disputes</p>

          <div style={{ padding: "5px" }} />

          <div className="disputes_body_wrapper">
            <p className="disputes_text">
              Shop on Saleko with confidence, knowing that we've got you covered
              in the event of any disputes with your purchase. Saleko offers a
              robust and transparent dispute resolution process, which is
              designed to help you resolve any issues that may arise with your
              purchase.
            </p>

            <p className="disputes_text">
              Our dispute resolution process is easy to access and use:
            </p>

            <div style={{ padding: "10px" }} />

            {/* Step 1 */}
            <div className="disputes_step_section">
              <p className="disputes_title_header">Step 1 </p>

              <hr className="disputes_underline" />

              <p className="disputes_text">
                Log in to your Saleko buyer profile and click on the "My Orders"
                tab.
              </p>

              <img src={footer_home_img} className="disputes_image" />
            </div>

            <div style={{ padding: "15px" }} />

            {/* Step 2 */}
            <div className="disputes_step_section">
              <p className="disputes_title_header">Step 2</p>

              <hr className="disputes_underline" />

              <p className="disputes_text">
                Select the specific order you're experiencing issues with from
                your list of existing orders. You can use the Order Number to
                help.
              </p>

              <img src={footer_home_img} className="disputes_image" />
            </div>

            <div style={{ padding: "15px" }} />

            {/* Step 3 */}
            <div className="disputes_step_section">
              <p className="disputes_title_header">Step 3</p>

              <hr className="disputes_underline" />

              <p className="disputes_text">
                Click on the "Help" icon located at the top right-hand corner of
                the page, and follow the prompts to submit your dispute claim.
              </p>

              <img src={footer_home_img} className="disputes_image" />
            </div>
          </div>

          <div style={{ padding: "15px" }} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DisputesPage;

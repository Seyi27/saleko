import React from "react";
import "./PickupLocationsPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import pickup_first_img from "../../../assets/images/svg/pickup_first_img.svg";
import pickup_second_img from "../../../assets/images/svg/pickup_second_img.svg";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const PickupLocationsPage = () => {
  return (
    <PageWrapper classname="pickup_location_container">
      <p className="pickup_location_title">Pickup locations</p>

      <div style={{ padding: "10px" }} />

      <div className="pickup_location_body_wrapper">
        {/* First section */}
        <div className="pickup_location_section">
          <div className="pickup_location_text_container">
            <p className="pickup_location_text">
              We understand that sometimes it may be more convenient for you to
              pick up your items rather than waiting for them to be delivered,
              which is why we are excited to announce that we now offer pick-up
              options for orders made on Saleko.
            </p>

            <p className="pickup_location_text">
              To take advantage of this option, simply select the "pick-up"
              option during your checkout process on Saleko. Once your order is
              ready for pick-up, we will send you an email with the pick-up
              location details and instructions on how to retrieve your items.
            </p>

            <p className="pickup_location_text">
              We currently have multiple pick-up locations available for your
              convenience, and we are always looking to expand our network to
              better serve our customers. Our pick-up hubs are carefully
              selected to provide a secure and convenient experience for our
              customers.
            </p>
          </div>

          <img src={pickup_first_img} className="pickup_location_image" />
        </div>

        <div style={{ padding: "15px" }} />

        {/* Second section */}
        <div className="pickup_location_section pickup_location_section_reverse">
          <div className="pickup_location_text_container">
            <p className="pickup_location_step">Saleko Pickup Hubs</p>

            <p className="pickup_location_text">
              32 Lewis Street, Lagos Island, Lagos.
            </p>

            <ol>
              <li className="pickup_location_text">
                1 Idumagbo Avenue, Lagos Island, Lagos.
              </li>
              <li className="pickup_location_text">
                75 Ojuelegba Road, Surulere, Lagos.
              </li>
              <li className="pickup_location_text">
                41 Opebi Road, Ikeja, Lagos.
              </li>
              <li className="pickup_location_text">
                22 Lekki-Epe Expressway, Lekki, Lagos.
              </li>
              <li className="pickup_location_text">
                Rago Market, Alaba Okoko, Lagos.
              </li>
              <li className="pickup_location_text">
                42 Lagos Road, Ikorodu, Lagos.
              </li>
            </ol>

            <p className="pickup_location_text">
              At Saleko, we're committed to supporting our merchants and helping
              them achieve their business goals. So, whether you're looking to
              expand your customer base, increase your brand visibility, or
              access funding to take your business to the next level, we're here
              to help.
            </p>

            <p className="pickup_location_text">
              We'd like to thank you for choosing Saleko for your shopping
              needs. If you have any questions or concerns about our pick-up
              options, please do not hesitate to reach out to our customer
              support team. Our dedicated team is available to assist you
              through various channels including email at {" "}
              <a href="">support@saleko.ng</a> and our website's virtual chat
              box.
            </p>
          </div>

          <img src={pickup_second_img} className="pickup_location_image" />
        </div>
      </div>

      <div style={{ padding: "10px" }} />
    </PageWrapper>
  );
};

export default PickupLocationsPage;

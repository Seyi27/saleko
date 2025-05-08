import React from "react";
import "./AdvertiseWithUsPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import advert_ic1 from "../../../assets/images/svg/advert_ic1.svg";
import advert_ic2 from "../../../assets/images/svg/advert_ic2.svg";
import advert_ic3 from "../../../assets/images/svg/advert_ic3.svg";
import advert_img from "../../../assets/images/svg/advert_img.svg";
import advert_ic4 from "../../../assets/images/svg/advert_ic4.svg";
import advert_ic5 from "../../../assets/images/svg/advert_ic5.svg";
import advert_ic6 from "../../../assets/images/svg/advert_ic6.svg";
import advert_ic7 from "../../../assets/images/svg/advert_ic7.svg";
import advert_step1 from "../../../assets/images/svg/advert_step1.svg";
import advert_step2 from "../../../assets/images/svg/advert_step2.svg";
import advert_step3 from "../../../assets/images/svg/advert_step3.svg";
import advert_step4 from "../../../assets/images/svg/advert_step4.svg";
import advert_step5 from "../../../assets/images/svg/advert_step5.svg";
import advert_banner from "../../../assets/images/svg/advert_banner.svg";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const AdvertiseWithUsPage = () => {
  const sellerSteps = [
    {
      step: "Step 1",
      description: "Set up a vibrant merchant profile.",
      imageUrl: advert_step1,
    },

    {
      step: "Step 2",
      description: "Upload a product from your inventory dashboard.",
      imageUrl: advert_step2,
    },

    {
      step: "Step 3",
      description: "Click on the product to view it.",
      imageUrl: advert_step3,
    },

    {
      step: "Step 4",
      description: `Hit the "Boost Sales" button and choose the number of days you'd like to spotlight your product, you’ll see the respective price for the advertisement.`,
      imageUrl: advert_step4,
    },

    {
      step: "Step 5",
      description:
        "Submit your ad request, and our customer service agent will be right with you to fast-track it.",
      imageUrl: advert_step5,
    },
  ];

  return (
    <PageWrapper classname="advert_container">
      <p className="advert_title">Advertise With Us</p>

      <div style={{ padding: "10px" }} />

      <div className="advert_body_wrapper">
        {/* Header Section */}
        <div className="advert_title_header_container">
          <p className="advert_title_header">Your customers are on Saleko </p>

          <hr className="advert_underline" />
        </div>

        <div style={{ padding: "10px" }} />

        {/* Create Awareness Section */}
        <div className="advert_awareness_section">
          <p className="advert_awareness_title">
            Create awareness and showcase your brand/product to millions of
            paying customers.
          </p>

          <div className="advert_awareness_card_container">
            <div className="advert_awareness_card">
              <img src={advert_ic1} className="advert_awareness_card_img" />
              <p>5,000+ reach</p>
            </div>

            <div className="advert_awareness_card">
              <img src={advert_ic2} className="advert_awareness_card_img" />
              <p>2,000 monthly unique visitors</p>
            </div>

            <div className="advert_awareness_card">
              <img src={advert_ic3} className="advert_awareness_card_img" />
              <p>1,000+ daily visits</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "30px" }} />

        {/* Advert Image Section */}
        <div className="advert_image_section">
          <img src={advert_img} className="advert_left_img" />

          <div className="advert_image_right_container">
            <div className="advert_content_item">
              <img src={advert_ic4} className="advert_content_ic" />
              <p>Increased visibility for your brand</p>
            </div>

            <div className="advert_content_item">
              <img src={advert_ic5} className="advert_content_ic" />
              <p>Access to a wide audience across all our channels</p>
            </div>

            <div className="advert_content_item">
              <img src={advert_ic6} className="advert_content_ic" />
              <p>Affordable and effective advertising solution</p>
            </div>

            <div className="advert_content_item">
              <img src={advert_ic7} className="advert_content_ic" />
              <p>
                Dedicated support to help you get the most out of your
                advertising
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: "40px" }} />

        {/* Advertise with us section */}
        <div className="advertise_with_us_main_wrapper">
          <div className="advert_title_header_container">
            <p className="advertise_with_us_title">Advertise With Us</p>
            <p className="advertise_with_us_title_header">
              Ready to showcase your products on Saleko? It's easy!{" "}
            </p>

            <hr className="advert_underline" />
          </div>

          <div>
            {sellerSteps.map((stepItem, index) => (
              <>
                <div style={{ padding: "20px" }} />

                <div
                  className={`advertise_with_us_item_section ${
                    index % 2 !== 0 ? "advertise_with_us_section_reverse" : ""
                  }`}
                  key={index}
                >
                  <div className="advertise_with_us_text_container">
                    <p className="advertise_with_us_step">{stepItem.step}:</p>

                    <p className="advertise_with_us_text">
                      {stepItem.description}
                    </p>
                  </div>

                  <img
                    src={stepItem.imageUrl}
                    className="advertise_with_us_item_image"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "30px" }} />

      <img src={advert_banner} className="advert_banner" />

      <div style={{ padding: "10px" }} />
    </PageWrapper>
  );
};

export default AdvertiseWithUsPage;

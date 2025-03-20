import React from "react";
import "./BecomeASellerPage.css";
import footer_home_img from "../../../assets/images/svg/footer_home_img.svg";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import secure_platform from "../../../assets/images/svg/secure_platform.svg";
import global_reach from "../../../assets/images/svg/global_reach.svg";
import bargaining_feature from "../../../assets/images/svg/bargaining_feature.svg";

const BecomeASellerPage = () => {
  const sellerSteps = [
    {
      step: "Step 1a",
      platform: "Desktop",
      description: `Look for the 'Sell on Saleko' button located on the 
  homepage. Click & select 'Set up shop' and get 
  started.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 1b",
      platform: "Mobile Browser Users",
      description: `Simply tap the menu icon on the left, then choose the
option "Create an Account". Let's go!`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 2",
      platform: "Fill out your basic information",
      description: `We only require essential information to create your
account, so don't worry about sharing any sensitive
personal details.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 3",
      platform: "Verify your account",
      description: `We will send a verification link to the email address
associated with your account. Please check your
inbox and click on the link to confirm your registration.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 4",
      platform: "Activate your seller dashboard",
      description: `Activate your Seller Dashboard - Now that you have a
Saleko account, it's time to become a seller. Please
click on the "Seller Dashboard" option in your
dashboard, and fill in the required information. Once
you've completed the form, our team will carefully
review your details, and your seller account will be
activated as soon as your account has been
approved and activated.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 5",
      platform: "Start Selling",
      description: `Congratulations! You're now ready to start selling on
Saleko. Once your account has been approved, you'll
gain access to our seller dashboard where you can
list your products, manage your inventory, and do
everything else you need to run a successful
ecommerce business. And that's not all, keep an eye
on your email as we'll provide you with regular tips on
how to improve your selling performance.`,
      imageUrl: footer_home_img,
    },
  ];

  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container become_seller_container">
          <p className="become_seller_title">Seller Profile</p>
          <p className="become_seller_text">
            Ready to start selling on Saleko? Follow these simple steps:
          </p>

          <div style={{ padding: "5px" }} />

          {/* Become a seller */}
          <div className="become_seller_body_wrapper">
            <p className="become_seller_header_text">
              Steps to Become a Seller
            </p>

            <div className="become_seller_underline" />

            <div style={{ padding: "10px" }} />

            {sellerSteps.map((stepItem, index) => (
              <>
                <div style={{ padding: "10px" }} />

                <div
                  className={`seller_item_section ${
                    index % 2 !== 0 ? "seller_item_section_reverse" : ""
                  }`}
                  key={index}
                >
                  <div className="seller_item_text_container">
                    <p className="seller_item_step">{stepItem.step}</p>

                    <p className="seller_item_platform">{stepItem.platform}</p>

                    <p className="become_seller_text seller_item_description">
                      {stepItem.description}
                    </p>
                  </div>

                  <img src={stepItem.imageUrl} className="seller_item_image" />
                </div>

                {index < sellerSteps.length - 1 && (
                  <div className="become_seller_underline" />
                )}
              </>
            ))}
          </div>

          <div style={{ padding: "15px" }} />

          {/* Benefits of Selling on Saleko */}
          <div className="benefits_selling_container">
            <p className="benefits_selling_title">
              Benefits of Selling on Saleko
            </p>
            <p className="benefits_selling_text become_seller_text">
              As a seller on Saleko, you'll be able to enjoy a variety of
              benefits, including the ability to negotiate prices with our
              merchants on Saleko, access to special deals and promotions, the
              ability to track your order history, and the convenience of
              shopping online from the comfort of your own home.
            </p>

            <div style={{ padding: "15px" }} />

            <div className="benefits_selling_item_container">
              {/* Global Reach */}
              <div className="benefits_selling_item">
                <img src={bargaining_feature} />
                <p className="benefits_selling_item_header">Global Reach</p>

                <p className="become_seller_text benefits_selling_item_text">
                  Showcase your products to customers worldwide
                </p>
              </div>

              {/* Bargaining Feature */}
              <div className="benefits_selling_item">
                <img src={global_reach} />
                <p className="benefits_selling_item_header">
                  Bargaining Feature
                </p>

                <p className="become_seller_text benefits_selling_item_text">
                  Authentic Nigerian market experience with price negotiation
                </p>
              </div>

              {/* Secure Platform */}
              <div className="benefits_selling_item">
                <img src={secure_platform} />
                <p className="benefits_selling_item_header">Secure Platform</p>

                <p className="become_seller_text benefits_selling_item_text">
                  Safe and secure ecosystem built on trust and confidence
                </p>
              </div>
            </div>

            <div style={{ padding: "20px" }} />

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BecomeASellerPage;

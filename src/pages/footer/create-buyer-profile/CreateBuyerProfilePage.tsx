import React from "react";
import "./CreateBuyerProfilePage.css";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";
import footer_home_img from "../../../assets/images/svg/footer_home_img.svg";

const CreateBuyerProfilePage = () => {
  const sellerSteps = [
    {
      step: "Step 1a",
      platform: "Desktop Users",
      description: `Start your journey by Clicking the 'Get Started' button button on Saleko's homepage. Once you're there, hit 'Sign Up' and we're ready to roll.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 1b",
      platform: "Mobile Browser Users",
      description: `Simply tap the menu icon on the left, then chose the option 'create an account'. Let's go!`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 2",
      platform: "Fill out your info",
      description: `Fill out your info - We'll need some basic information from you to create your account. Don't worry, we won't ask for anything too personal!`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 3",
      platform: "Verify your credentials",
      description: `Verify your credentials - We'll send a verification link to the email address associated with your account. Please check your inbox and click on the link to verify your account.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 4",
      platform: "Let's get shopping",
      description: `You're in! Start browsing through our amazing selection of products and adding your favourites to your cart. We've got everything from fashion to electronics to home decor, so you're bound to find something you love.`,
      imageUrl: footer_home_img,
    },
  ];
  
  return (
    <PageWrapper classname="buyer_profile_container">
      <p className="buyer_profile_title">Create Buyer Profile</p>
      <p className="buyer_profile_text">
        Are you ready to get your hands on some amazing products from your local
        markets? Here's how to set up a buyers' profile on Saleko:{" "}
      </p>

      <div style={{ padding: "5px" }} />

      {/* Steps to become a seller */}
      <div className="buyer_profile_body_wrapper">
        <p className="buyer_profile_header_text">Steps to Become a Seller</p>

        <div className="buyer_profile_underline" />

        <div style={{ padding: "10px" }} />

        {sellerSteps.map((stepItem, index) => (
          <>
            <div style={{ padding: "10px" }} />

            <div
              className={`buyer_profile_section ${
                index % 2 !== 0 ? "buyer_profile_section_reverse" : ""
              }`}
              key={index}
            >
              <div className="buyer_profile_text_container">
                <p className="buyer_profile_step">{stepItem.step}</p>

                <p className="buyer_profile_platform">{stepItem.platform}</p>

                <p className="become_seller_text buyer_profile_description">
                  {stepItem.description}
                </p>
              </div>

              <img src={stepItem.imageUrl} className="buyer_profile_image" />
            </div>

            {index < sellerSteps.length - 1 && (
              <div className="buyer_profile_underline" />
            )}
          </>
        ))}

        <div style={{ padding: "20px" }} />

        <p className="buyer_profile_text" style={{ textAlign: "center" }}>
          By signing up on Saleko, you'll be able to enjoy a variety of
          benefits, including the ability to negotiate prices with our merchants
          on Saleko, access to special deals and promotions, the ability to
          track your order history, and the convenience of shopping online from
          the comfort of your own home.
        </p>

        <div style={{ padding: "20px" }} />
      </div>

      <div style={{ padding: "20px" }} />
    </PageWrapper>
  );
};

export default CreateBuyerProfilePage;

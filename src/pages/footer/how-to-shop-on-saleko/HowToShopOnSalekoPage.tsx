import React from "react";
import "./HowToShopOnSalekoPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import footer_home_img from "../../../assets/images/svg/footer_home_img.svg";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const HowToShopOnSalekoPage = () => {
  const sellerSteps = [
    {
      step: "Step 1",
      description: `Explore and Discover - Get lost in our vast selection of products and categories. From traditional clothing to modern electronics, we have everything you need to embrace your Nigerian heritage and modern lifestyle. Discover new arrivals, bestsellers, and exclusive collections that will make you feel right at home.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 2",
      description: `Hunt for the Perfect Product - Our powerful search and filtering tools make it easy to find the product of your dreams. Use keywords, categories, brands, and even price ranges to narrow down your search and find exactly what you're looking for. No need to waste time scrolling through endless pages of irrelevant products!`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 3",
      description: `Guess what? On Saleko, you can actually bargain prices like a pro! - We give you the power to negotiate prices with the merchants so you can score amazing deals on the products you love. So go ahead, flex your bargaining muscles and show those merchants who's boss.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 4",
      description: `Hunt for the Perfect Product - Our powerful search and filtering tools make it easy to find the product of your dreams. Use keywords, categories, brands, and even price ranges to narrow down your search and find exactly what you're looking for. No need to waste time scrolling through endless pages of irrelevant products!`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 5",
      description: `Add to Cart and Score Big - Ready to make your purchase? Add your favourite items to your Saleko cart and watch the savings pile up! Take advantage of our amazing discounts, coupons, and special promotions to get the best deals on the market.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 6",
      description: `Checkout with Ease - Our checkout process is a breeze! Fill in your delivery and payment details and voila! You're ready to go. Rest assured that all transactions are 100% secure and protected. Shop with confidence and peace of mind.`,
      imageUrl: footer_home_img,
    },

    {
      step: "Step 7",
      description: `Revel in the Joy of Shopping - Sit back, relax, and wait for your goodies to arrive! Whether it's fashion, home goods, beauty, or tech, we guarantee you'll be delighted with your purchase. Our customer service team is always here to help, so feel free to reach out with any questions or concerns.`,
      imageUrl: footer_home_img,
    },
  ];

  return (
    <PageWrapper classname="shop_saleko_container">
      <p className="shop_saleko_title">Shop on Saleko</p>

      <div style={{ padding: "5px" }} />

      <div className="shop_saleko_body_wrapper">
        <p className="shop_saleko_text">
          Welcome to Saleko, the ultimate shopping destination, where
          convenience meets excitement! Are you ready to take your shopping game
          to the next level? Look no further because our Saleko is here to
          satisfy your every need. Here's your guide on how to shop like a pro
          on Saleko, tailored specifically for our Nigerian shoppers:
        </p>

        <div style={{ padding: "10px" }} />

        {sellerSteps.map((stepItem, index) => (
          <>
            <div style={{ padding: "10px" }} />

            <div
              className={`shop_saleko_item_section ${
                index % 2 !== 0 ? "shop_saleko_section_reverse" : ""
              }`}
              key={index}
            >
              <div className="shop_saleko_text_container">
                <p className="shop_saleko_step">{stepItem.step}</p>

                <p className="shop_saleko_text">{stepItem.description}</p>
              </div>

              <img src={stepItem.imageUrl} className="shop_saleko_item_image" />
            </div>

            <div className="shop_saleko_underline" />
          </>
        ))}

        <p className="shop_saleko_last_text">
          From Lagos Island to Lagos Mainland, and everywhere in between, we've
          got you covered. Shop with us today and experience the ultimate
          shopping high, Nigerian style!
        </p>
      </div>

      <div style={{ padding: "15px" }} />
    </PageWrapper>
  );
};

export default HowToShopOnSalekoPage;

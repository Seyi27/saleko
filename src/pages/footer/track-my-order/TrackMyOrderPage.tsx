import React from "react";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";
import "./TrackMyOrderPage.css";
import advert_step1 from "../../../assets/images/svg/advert_step1.svg";
import advert_step2 from "../../../assets/images/svg/advert_step2.svg";
import advert_step3 from "../../../assets/images/svg/advert_step3.svg";
import advert_step4 from "../../../assets/images/svg/advert_step4.svg";
import advert_step5 from "../../../assets/images/svg/advert_step5.svg";
import track_order1 from "../../../assets/images/svg/track_order1.svg";
import track_order2 from "../../../assets/images/svg/track_order2.svg";
import track_order3 from "../../../assets/images/svg/track_order3.svg";
import track_order4 from "../../../assets/images/svg/track_order4.svg";
import track_order5 from "../../../assets/images/svg/track_order5.svg";

const TrackMyOrderPage = () => {
  const steps = [
    {
      step: "Step 1",
      description:
        "Click on the chat icon located at the bottom right-hand corner of your screen. Once you click on the icon, a chat window will open up, and you'll be connected with one of our support agents.",
      imageUrl: advert_step2,
    },

    {
      step: "Step 2",
      description: ["Select the option “I need help Tracking my Order”."],
      imageUrl: track_order3,
    },

    {
      step: "Step 3",
      description: "Enter your Full Name, Contact Number, and Order Number.",
      imageUrl: track_order4,
    },

    {
      step: "Step 4",
      description: `Follow the steps given to you by our representatives.`,
      imageUrl: track_order5,
    },
  ];

  const firstSection = [
    {
      description: [
        `     Welcome to Saleko, where we make it easy for you to track your
              order! Whether you're a merchant or a buyer, you can conveniently
              monitor your order's progress through your personalised Saleko
              dashboard. Once you create your buyer or seller account on Saleko,
              you'll have access to the “My Orders” section [for buyers] or the
              “Orders” section [for sellers], where you can view the status of
              your order in real-time.`,
        `Our intuitive system will keep you informed every step of the way, from the moment your order is placed to the moment it arrives at your doorstep. You'll receive automatic updates on the status of your order, including when it's been shipped and when it's on its way. With Saleko, you'll never be left in the dark about the status of your order.`,
      ],
      imageUrl: track_order1,
    },

    {
      description: [
        "So sit back, relax, and let us take care of the details. We're committed to making your online shopping experience as smooth and hassle-free as possible. ",
        "If you are still having issues tracking your order, please don't hesitate to reach out to our friendly customer support team through our website’s chat box and they’d be happy to serve you. ",
      ],
      imageUrl: track_order2,
    },
  ];

  return (
    <PageWrapper classname="track_order_container">
      <p className="track_order_title">Track My Order</p>
      <div style={{ padding: "5px" }} />
      <div className="track_order_body_wrapper">

        {/* First section */}
        {firstSection.map((stepItem, index) => (
          <>
            <div
              className={`track_order_item_section ${
                index % 2 !== 0 ? "track_order_section_reverse" : ""
              }`}
              key={index}
            >
              <div className="track_order_text_container">
                <p className="track_order_text">{stepItem.description[0]}</p>
                <p className="track_order_text">{stepItem.description[1]}</p>
              </div>

              <img src={stepItem.imageUrl} className="track_order_item_image" />
            </div>

            <div style={{ padding: "20px" }} />

            <div className="track_order_underline" />
          </>
        ))}

        <div style={{ padding: "10px" }} />

        {/* Steps sections */}
        <div>
          <p className="track_order_header_text">Steps</p>

          <div className="track_order_underline" />

          {steps.map((stepItem, index) => (
            <>
              <div
                className={`track_order_item_section ${
                  index % 2 !== 0 ? "track_order_section_reverse" : ""
                }`}
                key={index}
              >
                <div className="track_order_text_container">
                  <p className="track_order_step">{stepItem.step}</p>

                  <p className="track_order_text">{stepItem.description}</p>
                </div>

                <img
                  src={stepItem.imageUrl}
                  className="track_order_item_image"
                />
              </div>

              <div style={{ padding: "20px" }} />

              <div className="track_order_underline" />
            </>
          ))}
        </div>

        <div style={{ padding: "20px" }} />

        {/* Last section */}
        <div className="track_order_item_section">
          <div className="track_order_text_container">
            <p className="track_order_text">
              Our chat support is available 24/7, so you can reach out to us
              anytime, anywhere. Our friendly and knowledgeable support team
              will work closely with you to help you resolve any issues you may
              be experiencing with your order.
            </p>

            <p className="track_order_text">
              Whether you need help tracking your package, updating your
              delivery address, or resolving a payment issue, we're here to
              help. Don't hesitate to reach out to us through our chatbox for
              fast and efficient support.
            </p>
          </div>

          <img src={advert_step5} className="track_order_item_image" />
        </div>

        <div style={{ padding: "20px" }} />

        <div className="track_order_underline" />

        {/* Last text */}
        <p className="track_order_last_text">
          At Saleko, we're committed to providing you with the best possible
          shopping experience. That's why we offer a variety of support
          channels, including chat support, to ensure that you have the help you
          need, when you need it. Try us out today and see for yourself!"
        </p>

        <p className="track_order_last_text">
          For further assistance. Do not hesitate Call 07000SALEKO or to reach
          out to us by email at support@saleko.ng
        </p>
      </div>
      <div style={{ padding: "15px" }} />{" "}
    </PageWrapper>
  );
};

export default TrackMyOrderPage;

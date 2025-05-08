import React, { useRef, useState } from "react";
import "./FaqsPage.css";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";
import { BsSearch } from "react-icons/bs";

const FaqsPage = () => {
  const [topicSearch, setTopicSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordionItems = [
    {
      title: "How do I become a merchant on Saleko?",
      content: `If you wish to set up shop on Saleko, <a href='#'>click here</a> for a step by step guide on creating a merchant profile.`,
      bgColor: 0,
    },
    {
      title: "How do I shop on Saleko?",
      content:
        "If you wish to shop from local markets, <a href='#'>click here</a> for a step by step guide on creating a buyer profile on Saleko.",
      bgColor: 1,
    },
    {
      title: "My order has payment issues",
      content: `If you have any issues relating to making payments on our platform, please reach out to our customer support representatives for immediate assistance through our website's chat box. You can locate the chat box via the chat icon at the bottom right-hand corner of your screen. Once you click on the icon, a chat window will open up, and you'll be connected with one of our support agents.
For further assistance with this issue, please send an email to <a href='#'>support@saleko.ng</a>.
We understand that sometimes, technical glitches happen, but we're committed to making sure that your experience with us at Saleko is a smooth one. So take a deep breath, relax and let's get this sorted out.`,
      bgColor: 2,
    },
    {
      title: "I would like to advertise my products on Saleko",
      content: `To advertise your products on Saleko, please reach out to us at <a href='#'>info@saleko.ng</a> or call 07000SALEKO.`,
      bgColor: 3,
    },
    {
      title: "Order cancellation issue",
      content: `If your order was cancelled or if you would like to cancel your order, please reach out to our customer support representatives for immediate assistance through our website's chat box. You can locate the chat box via the chat icon at the bottom right-hand corner of your screen. Once you click on the icon, a chat window will open up, and you'll be connected with one of our support agents.
For further assistance call 07000SALEKO or email the support team at <a href='#'>support@saleko.ng</a>.`,
      bgColor: 0,
    },
    {
      title: "I need help tracking my order",
      content: `Need help tracking an order? <a href='#'>Click here</a> for more information`,
      bgColor: 1,
    },
    {
      title: "I have issues with my delivered product",
      content: `Please know that we take all customer complaints seriously and we're here to help resolve this issue for you as quickly as possible. We want you to have the best experience possible with our service, and we're committed to making it right. Let's work together to figure out what went wrong and how we can fix it.
<a href='#'>Click here</a> to find out how to resolve issues you may have with your order.`,
      bgColor: 2,
    },
    {
      title: "Order returns & refunds",
      content: `We're truly sorry to hear that you're not satisfied with your order and that you're considering a refund. We take all customer feedback seriously, and we want to make sure that we do everything we can to address your concerns and make things right.
<a href='#'>Click here</a> to find out how to go about returns and refunds.`,
      bgColor: 3,
    },
    {
      title: "Pickup locations",
      content: `We currently have multiple pickup locations available for your convenience, and we are always looking to expand our network to better serve our customers.
<a href='#'>Click here</a> to find out more about our pickup locations.`,
      bgColor: 0,
    },
  ];

  // Define an array of colors for each item
  const backgroundColors = ["#084C3F", "#F4AF47", "#006A4E", "#1C1C1C"];

  return (
    <PageWrapper classname="faqs_container">
      <div className="faqs_header_container">
        <p className="faqs_title">Frequently Asked Questions</p>

        <div className="faqs_search_input_container">
          <BsSearch size={15} />
          <input
            value={topicSearch}
            onChange={(e) => setTopicSearch(e.target.value)}
            className="faqs_search_input"
            placeholder="Search for products"
          />
        </div>
      </div>

      <div className="faq_accordion_container">
        {accordionItems.map((item, index) => (
          <div key={index} className="faq_accordion_item">
            <div
              className="faq_accordion_header"
              style={{
                backgroundColor: backgroundColors[item.bgColor], // Apply dynamic background color
                color: item.bgColor === 1 ? "black" : "white",
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.title}
            </div>
            <div
              className={`faq_accordion_content ${
                openIndex === index ? "open" : ""
              }`}
              style={{
                backgroundColor: backgroundColors[item.bgColor], // Apply dynamic background color
                color: item.bgColor === 1 ? "black" : "white",
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: item.content.replace(
                    "<a ",
                    `<a style="color: ${
                      item.bgColor === 1 ? "black" : "white"
                    };" `
                  ),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default FaqsPage;

import React from "react";
import "./SellerGuidePage.css";
import advert_step1 from "../../../assets/images/svg/advert_step1.svg";
import advert_step2 from "../../../assets/images/svg/advert_step2.svg";
import advert_step3 from "../../../assets/images/svg/advert_step3.svg";
import advert_step4 from "../../../assets/images/svg/advert_step4.svg";
import advert_step5 from "../../../assets/images/svg/advert_step5.svg";
import track_order1 from "../../../assets/images/svg/track_order1.svg";
import track_order2 from "../../../assets/images/svg/track_order2.svg";
import track_order3 from "../../../assets/images/svg/track_order3.svg";
import track_order4 from "../../../assets/images/svg/track_order4.svg";
import seller_guide1 from "../../../assets/images/svg/seller_guide1.svg";
import seller_guide2 from "../../../assets/images/svg/seller_guide2.svg";
import seller_guide3 from "../../../assets/images/svg/seller_guide3.svg";
import seller_guide4 from "../../../assets/images/svg/seller_guide4.svg";
import seller_guide5 from "../../../assets/images/svg/seller_guide5.svg";
import seller_guide6 from "../../../assets/images/svg/seller_guide6.svg";
import seller_guide7 from "../../../assets/images/svg/seller_guide7.svg";
import seller_guide8 from "../../../assets/images/svg/seller_guide8.svg";
import seller_guide9 from "../../../assets/images/svg/seller_guide9.svg";
import seller_guide_vid from "../../../assets/images/svg/seller_guide_vid.svg";
import track_order5 from "../../../assets/images/svg/track_order5.svg";

import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const SellerGuidePage = () => {
  const manageDashboard = [
    {
      title: "DASHBOARD OVERVIEW:",
      description: [
        "Upon logging into Saleko dashboard, you can at a glance find an overview of all your sales and general updates. This provides vital information regarding status of orders, top selling products, stock threshold among others. Visiting this page daily keeps you well updated with your sales on Saleko.",
      ],
      imageUrl: seller_guide2,
    },

    {
      title: "Fill out your info",
      description: [
        "In order to sell on Saleko, you would need to upload your product and relevant information to enable buyers to shop from you. The product page shows you all the products you have available on Saleko and where you can upload and update them.",
        "To view a list of your products, simply click on ‘Product’, there you can find all the information regarding a product. You can also search for a particular product and proceed to take any further action such as editing, deleting or duplicating the product from the ‘action’ button. ",
        "To create a new product, click on ‘create’ from the products page and then ‘create new’. Fill the spaces required such as name of the product, quantity, price and upload a clear picture of the product along with a brief description and submit.",
        "Once you have submitted, Saleko will approve of your product to see if it meets with our product guidelines, then it will become available to buyers to shop.",
      ],
      imageUrl: seller_guide3,
    },

    {
      title: "MANAGING ORDERS:",
      description: [
        "Saleko allows sellers to manage incoming orders from buyers from the dashboard. You can view this by clicking on ‘Orders’ on the dashboard. Sellers can view all orders and their status from customers as well as individual orders and other relevant information regarding an order. This feature allows you to take note of new orders, pending orders or closed orders. You will also be notified when a new order comes in. Sellers can also create invoices from the order page for customers and also create shipment from this ",
      ],
      imageUrl: seller_guide4,
    },

    {
      title: "HANDLING NEGOTIATIONS:",
      description: [
        `It is no secret that Salako offers a unique feature for buyers to be able to negotiate prices on products, especially bulk purchases or as the seller permits. Sellers are encouraged to enable this feature so as to depict the real life market situation allowing customers the opportunity to save some money while buying more items. These requests will be viewed and managed on the Negotiation page on the dashboard. `,
      ],
      imageUrl: seller_guide5,
    },

    {
      title: "TRACK YOUR TRANSACTIONS AND EARNINGS:",
      description: [
        `It is no secret that Salako offers a unique feature for buyers to be able to negotiate prices on products, especially bulk purchases or as the seller permits. Sellers are encouraged to enable this feature so as to depict the real life market situation allowing customers the opportunity to save some money while buying more items. These requests will be viewed and managed on the Negotiation page on the dashboard. `,
      ],
      imageUrl: seller_guide6,
    },

    {
      title: "ADVERTISING",
      description: [
        `Saleko has been built to enable your customers to find you easily, however in order to reach even millions of paying customers, you might need to advertise your products. Find out more reasons to advertise here (link to advertise with us page). `,
        `Saleko offers free assistance on how you can easily advertise your product to millions of paying customers.  `,
      ],
      imageUrl: seller_guide7,
    },

    {
      title: "Product Delivery/Shipping",
      description: [
        `Saleko offers sellers a stress free experience and that is why Saleko will handle deliveries on behalf of customers. When a customer has placed an order, as a seller you will be required to package the order and click on the ‘ship’ button under the ‘orders’ page. This will immediately notify Saleko and a dispatch will be on its way to you within 24-48 hours. The entire shipping process can be tracked on that page.  `,
        `Simply ensure that the item for delivery is made available for the assigned dispatch rider. Saleko will handle and deliver the item within the approved time and ensure that goods are carefully handled in transit. `,
      ],
      imageUrl: seller_guide8,
    },

    {
      title: "Payments",
      description: [
        `Saleko has made payment so safe and secure through our escrow system , which  enables both buyers and sellers to be held accountable. Payments for items purchased by shoppers are made into  Saleko’s Escrow account. Saleko then makes payment available to the seller after a set period of time,  of course in the absence of a dispute raised from the buyer. As a seller,  It should really take no longer than 3-5 days for you to receive your payment. In the event that there is a dispute, Saleko will see that it is resolved and if the seller is cleared of every issue, payment will then be disbursed to the seller. `,
      ],
      imageUrl: seller_guide9,
    },
  ];
  return (
    <PageWrapper classname="seller_guide_container">
      <div>
        <p className="seller_guide_title">Seller’s Guide</p>
        <p className="seller_guide_text">
          Here is how to make the most use of Saleko as a seller to reach
          millions of buyers and to manage your business.
        </p>
      </div>

      <div style={{ padding: "5px" }} />

      {/* First wrapper */}
      <div className="seller_guide_body_wrapper">
        {/* First section */}
        <div className="seller_guide_item_section">
          <div className="seller_guide_text_container">
            <p className="seller_guide_platform">The Seller Dashboard</p>

            <p className="seller_guide_text">
              Our chat support is available 24/7, so you can reach out to us
              anytime, anywhere. Our friendly and knowledgeable support team
              will work closely with you to help you resolve any issues you may
              be experiencing with your order.
            </p>

            <p className="seller_guide_text">
              Whether you need help tracking your package, updating your
              delivery address, or resolving a payment issue, we're here to
              help. Don't hesitate to reach out to us through our chatbox for
              fast and efficient support.
            </p>
          </div>

          <img src={seller_guide1} className="seller_guide_item_image" />
        </div>

        <div style={{ padding: "10px" }} />

        <div className="seller_guide_underline" />

        <div style={{ padding: "10px" }} />

        {/* Manage dashboard sections */}
        <div>
          <p className="seller_guide_header_text">
            Here is how to manage your dashboard
          </p>

          <div className="seller_guide_underline" />

          {manageDashboard.map((stepItem, index) => (
            <>
              <div
                className={`seller_guide_item_section ${
                  index % 2 !== 0 ? "seller_guide_section_reverse" : ""
                }`}
                key={index}
              >
                <img
                  src={stepItem.imageUrl}
                  className="seller_guide_item_image"
                />

                <div className="seller_guide_text_container">
                  <p className="seller_item_platform">{stepItem.title}</p>

                  {stepItem.description.length > 1 ? (
                    <>
                      <p className="seller_guide_text">
                        {stepItem.description[0]}
                      </p>
                      <p className="seller_guide_text">
                        {stepItem.description[1]}
                      </p>
                    </>
                  ) : (
                    <p className="seller_guide_text">
                      {stepItem.description[0]}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ padding: "20px" }} />

              {index < manageDashboard.length - 1 && (
                <div className="seller_guide_underline" />
              )}
            </>
          ))}
        </div>

        <div style={{ padding: "20px" }} />
      </div>

      <div style={{ padding: "20px" }} />

      {/* Video wrapper */}
      <div className="seller_guide_body_wrapper">
        <div style={{ padding: "1px" }} />

        <div>
          <p className="seller_guide_header_text">
            Watch our Seller Guide Video{" "}
          </p>

          <div className="seller_guide_underline" />
        </div>

        <div style={{ padding: "20px" }} />

        <img src={seller_guide_vid} className="seller_guide_vid_image" />

        <div style={{ padding: "20px" }} />
      </div>
    </PageWrapper>
  );
};

export default SellerGuidePage;

import React from "react";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import "./EscrowServicePage.css";
import escrow_service from '../../../assets/images/svg/escrow_service.svg'

const EscrowServicePage = () => {
  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container escrow_container">
          <p className="escrow_title">Escrow Service</p>

          <div style={{ padding: "5px" }} />

          <div className="escrow_body_wrapper">
            <p className="escrow_text">
              Saleko has made payments for products safe and secure through our
              Escrow service. Our Escrow service ensures that both parties are
              held accountable throughout the transaction process.
            </p>

            <div style={{ padding: "15px" }} />

            <div className="escrow_title_header_container">
              <p className="escrow_title_header">
                So, how does our payment Escrow service work?
              </p>

              <hr className="escrow_underline" />
            </div>

            <div className="escrow_content_wrapper">
              <div className="escrow_left_container">
                <p className="escrow_text">
                  When a shopper places an order and makes a payment, the funds
                  are held in escrow until the order is delivered. Only after
                  the customer has received their order without any issues or
                  complaints is the payment released to the merchant's account.
                </p>

                <p className="escrow_text">
                  At Saleko, we understand the importance of trust and
                  transparency when it comes to online transactions. That's why
                  our Escrow service provides both buyers and sellers with the
                  peace of mind they need to conduct transactions with
                  confidence.
                </p>

                <p className="escrow_text">
                  Choose Saleko for a seamless and secure buying and selling
                  experience, where both parties can trust that their interests
                  are protected.
                </p>
              </div>

              <div className="escrow_right_container">
                <img src={escrow_service}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EscrowServicePage;

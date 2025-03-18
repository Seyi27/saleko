import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import ProductSection from "../../components/product-section/ProductSection";
import { Link, useNavigate } from "react-router-dom";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../components/nav-categories/NavCategories";
import CustomButton from "../../components/custom-button/CustomButton";
import { productData } from "../../helpers/Data";
import Footer from "../../components/footer/Footer";
import {
  BsCheck2Circle,
  BsCheckCircleFill,
  BsChevronBarRight,
  BsChevronRight,
  BsWallet,
} from "react-icons/bs";
import payment_monnify_ic from "../../assets/images/svg/payment_monnify_ic.svg";
import payment_paystack_ic from "../../assets/images/svg/payment_paystack_ic.svg";
import CheckoutCartItem from "../../components/checkout-cart-item/CheckoutCartItem";
import coupon_code_ic from "../../assets/images/svg/coupon_code_ic.svg";
import CustomInputModal from "../../components/transaction-pin-modal/TransactionPinModal";
import CustomModal from "../../components/custom-modal/CustomModal";
import { Product } from "../../types/productTypes";

const CheckoutPage = () => {
  const data = productData.slice(0, 4);
  const [visibleRows, setVisibleRows] = useState(2);
  const [rowData, setRowData] = useState<Product[] | undefined>();
  const [activeDeliveryOption, setActiveDeliveryOption] = useState("Door step");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [orderConfirmedModal, setOrderConfirmedModal] = useState(false);

  const handleConfirmOrder = () => {
    if (selectedPayment == "wallet") {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (selectedPayment.length > 0) {
      setDisabled(false);
    }
  }, [selectedPayment]);

  return (
    <>
      <div>
        <NavHeader />

        <NavHeaderSearch />

        <NavCategories />

        <div className="body_container">
          <div className="body_second_container">
            <div className="checkout_main_container">
              <div className="checkout_breadcrumbs_container">
                <Link to={"/"} className="checkout_inactive_link">
                  Home
                </Link>
                <span style={{ color: "#a3a9c2" }}>/</span>
                <Link to={"/checkout"} className="checkout_active_link">
                  Checkout
                </Link>
              </div>

              <div style={{ marginTop: "30px" }}>
                <h1>Checkout</h1>

                <div className="checkout_body_container">
                  <div style={{ flex: 1 }}>
                    {/* Checkout delivery */}
                    <div className="checkout_delivery_border_container">
                      <div className="checkout_delivery_header">
                        <BsCheckCircleFill color="#084C3F" />
                        <p style={{ margin: 0 }}>Delivery</p>
                      </div>

                      <hr
                        style={{
                          border: "0.5px solid #E7E9EB",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />

                      <div style={{ marginTop: "40px" }}>
                        <p className="delivery_options_text">
                          Delivery options
                        </p>

                        <div className="delivery_options_child_container">
                          <div
                            className={`delivery_option_card ${
                              activeDeliveryOption == "Door step" &&
                              "active_delivery_option"
                            }`}
                            onClick={() => setActiveDeliveryOption("Door step")}
                          >
                            <p>Door Step Delivery</p>
                            <span>Takes 3-5 business days</span>
                            {activeDeliveryOption == "Door step" && (
                              <div className="delivery_active_ic">
                                <BsCheck2Circle color="#084C3F" size={20} />
                              </div>
                            )}
                          </div>

                          <div
                            className={`delivery_option_card ${
                              activeDeliveryOption == "pickup" &&
                              "active_delivery_option"
                            }`}
                            onClick={() => setActiveDeliveryOption("pickup")}
                          >
                            <p>Pickup</p>
                            <span>Pick from station location</span>
                            {activeDeliveryOption == "pickup" && (
                              <div className="delivery_active_ic">
                                <BsCheck2Circle color="#084C3F" size={20} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Customer Address */}
                      <div className="customer_address_container">
                        <p>Customer Address</p>

                        <div className="customer_change_container">
                          <p>Change</p>
                          <BsChevronRight color="#084C3F" size={15} />
                        </div>
                      </div>

                      {/* Home */}
                      <div className="home_details_container">
                        <p>Home</p>

                        <p>Ogunsola Abiodun</p>

                        <p>2, Ajanlekoko Street, Ojo Lagos.</p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="payment_border_container">
                      <div className="payment_header">
                        <BsCheckCircleFill color="#737373" />
                        <p style={{ margin: 0 }}>Payment</p>
                      </div>
                      <hr
                        style={{
                          border: "0.5px solid #E7E9EB",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <div style={{ marginTop: "40px" }}>
                        <div>
                          <div className="payment_radio_input_container">
                            <input
                              type="radio"
                              name="payment"
                              value="wallet"
                              onChange={(e) =>
                                setSelectedPayment(e.target.value)
                              }
                            />
                            <p>
                              <BsWallet color="#084C3F" /> Wallet
                            </p>
                          </div>
                          <span className="payment_wallet_bal">
                            Bal: ₦300,000.00
                          </span>
                        </div>

                        <div
                          className="payment_radio_input_container"
                          style={{ marginTop: "30px" }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="monnify"
                            onChange={(e) => setSelectedPayment(e.target.value)}
                          />
                          <img src={payment_monnify_ic} />
                        </div>

                        <div
                          className="payment_radio_input_container"
                          style={{ marginTop: "30px" }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="paystack"
                            onChange={(e) => setSelectedPayment(e.target.value)}
                          />
                          <img src={payment_paystack_ic} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Cart Summary */}
                  <div className="checkout_cart_summary">
                    <div className="checkout_cart_header_container">
                      <p className="checkout_cart_summary_text">Cart Summary</p>

                      <div className="checkout_modify_cart_container">
                        <p>Modify Cart</p>
                        <BsChevronRight color="#084C3F" />
                      </div>
                    </div>

                    <div style={{ border: "0.5px solid #E7E9EB" }} />

                    <div style={{ paddingTop: "20px" }}>
                      {data.map((item, index) => (
                        <div key={index}>
                          <CheckoutCartItem item={item} />
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: "10px" }} />

                    <div className="checkout_subtotal_container">
                      <p className="checkout_subtotal_text">Subtotal</p>
                      <p className="checkout_subtotal_amount">₦300,000.00</p>
                    </div>

                    <div className="checkout_subtotal_container">
                      <p className="checkout_subtotal_text">Delivery</p>
                      <p className="checkout_subtotal_amount">₦3,000.00</p>
                    </div>

                    <div style={{ border: "0.5px solid #E7E9EB" }} />

                    <div className="checkout_subtotal_container">
                      <p
                        className="checkout_subtotal_text"
                        style={{ fontWeight: 700 }}
                      >
                        Total
                      </p>
                      <p className="checkout_subtotal_amount">₦33,000.00</p>
                    </div>

                    <div style={{ border: "0.5px solid #E7E9EB" }} />

                    <div className="coupon_container">
                      <div className="coupon_input_container">
                        <img src={coupon_code_ic} />
                        <input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="coupon_textinput"
                        />
                      </div>

                      <CustomButton
                        label="Apply"
                        width={"20%"}
                        height="44px"
                        bgColor="white"
                        borderColor="#FFFFFF"
                        borderWidth="1px"
                        textColor="#737373"
                        fontSize={14}
                      />
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <CustomButton
                        label="Confirm Order"
                        width={"100%"}
                        height="44px"
                        bgColor="#084c3f"
                        borderColor="#FFFFFF"
                        borderWidth="1px"
                        textColor="white"
                        fontSize={14}
                        fontWeight={700}
                        disabled={disabled}
                        onClick={handleConfirmOrder}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Products */}
              <div>
                <ProductSection
                  name={"Recommended Products"}
                  data={productData}
                  type="related"
                  visibleRows={visibleRows}
                  setRowData={setRowData}
                  viewAll
                />

                {/* {visibleRows < rowData.length && (
              <button className="view_more_buton" onClick={handleMoreButton}>
                View More
                <BsChevronDown size={12} color={"white"} />
              </button>
            )} */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <CustomInputModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        setOrderConfirmedModal={setOrderConfirmedModal}
      />

      <CustomModal
        isOpen={orderConfirmedModal}
        closeModal={() => setOrderConfirmedModal(false)}
        label="order_confirmed"
      />
    </>
  );
};

export default CheckoutPage;

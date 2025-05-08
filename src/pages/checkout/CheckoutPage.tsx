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
  BsChevronDown,
  BsChevronRight,
  BsWallet,
} from "react-icons/bs";
import payment_monnify_ic from "../../assets/images/svg/payment_monnify_ic.svg";
import payment_paystack_ic from "../../assets/images/svg/payment_paystack_ic.svg";
import blusalt from "../../assets/images/svg/blusalt.svg";
import CheckoutCartItem from "../../components/checkout-cart-item/CheckoutCartItem";
import coupon_code_ic from "../../assets/images/svg/coupon_code_ic.svg";
import CustomInputModal from "../../components/transaction-pin-modal/TransactionPinModal";
import CustomModal from "../../components/custom-modal/CustomModal";
import { Product } from "../../types/productTypes";
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { formatPrice } from "../../helpers/helper";
import {
  useMonifyCheckoutApiMutation,
  usePaystackCheckoutApiMutation,
} from "../../services/cartsApi";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { useTooltip } from "../../context/TooltipContext";
import PickupLocationModal from "../../components/pickup-location-modal/PickupLocationModal";
import {
  CustomerAddressDataType,
  PickupLocationType,
} from "../../types/appTypes";
import { useLazyFetchCustomerAddressQuery } from "../../services/appApi";
import { addToCustomerAddress } from "../../slice/addressSlice";
import { useLazyGetAllProductsByCategoryQuery } from "../../services/productsApi";
import { TailSpin } from "react-loader-spinner";

const CheckoutPage = () => {
  const [activeDeliveryOption, setActiveDeliveryOption] = useState("Door step");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [defaultAddress, setDefaultAddress] =
    useState<CustomerAddressDataType>();

  const [confirmOrderBtnLoader, setConfirmOrderBtnLoader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [orderConfirmedModal, setOrderConfirmedModal] = useState(false);
  const [openPickupModal, setOpenPickupModal] = useState(false);
  const [openDeliveryModal, setOpenDeliveryModal] = useState(false);

  const [selectedAddressDetails, setSelectedAddressDetails] = useState<
    PickupLocationType | undefined
  >();
  const [customerAddressDetails, setCustomerAddressDetails] =
    useState<CustomerAddressDataType[]>();

  // To fetch for a particular category for recommended products

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [totalFetchedCategoryData, setTotalFetchedCategoryData] =
    useState<number>(0);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] =
    useState<number>(12);
  const [viewMoreLoader, setViewMoreLoader] = useState(false);
  const [categoryName, setCategoryName] = useState<string | undefined>("");

  const [getAllProductsByCategory, { isLoading: categoryLoader }] =
    useLazyGetAllProductsByCategoryQuery();

  const [paystackCheckoutApi] = usePaystackCheckoutApiMutation();
  const [monifyCheckoutApi] = useMonifyCheckoutApiMutation();
  const [fetchCustomerAddress] = useLazyFetchCustomerAddressQuery();

  const user = useSelector((state: RootState) => state.userDetails.user);
  const cart = useSelector((state: RootState) => state.cart.user_cart);
  const cartItems = useSelector(
    (state: RootState) => state.cart.user_cart?.items
  );
  const address = useSelector(
    (state: RootState) => state.address.customerAddress
  );

  const { showTooltip, isVisible, content } = useTooltip();
  const dispatch = useDispatch();

  const handleDoorDelivery = () => {
    if (user) {
      setOpenDeliveryModal(true);
    } else {
      showTooltip();
    }
  };

  const handlePickupLocation = () => {
    if (user) {
      setOpenPickupModal(true);
    } else {
      showTooltip();
    }
  };

  const handleMonifyCheckout = async () => {
    setConfirmOrderBtnLoader(true);
    try {
      const res = await monifyCheckoutApi({
        cart_id: cart?.id,
      }).unwrap();
      if (res) {
        // window.location.href = res.data.data.authorization_Url;
        setConfirmOrderBtnLoader(false);
      }
    } catch (error) {
      showCustomToast({
        message:
          "Kindly check your internet connection. Please try again later..",
        type: "error",
      });
      setConfirmOrderBtnLoader(false);
    }
  };

  const handlePaystackCheckout = async () => {
    setConfirmOrderBtnLoader(true);
    try {
      const res = await paystackCheckoutApi({
        cart_id: cart?.id,
      }).unwrap();
      if (res) {
        window.location.href = res.data.data.authorization_Url;
        setConfirmOrderBtnLoader(false);
      }
    } catch (error) {
      showCustomToast({
        message:
          "Kindly check your internet connection. Please try again later..",
        type: "error",
      });
      setConfirmOrderBtnLoader(false);
    }
  };

  const handleBlusaltCheckout = async () => {

  };

  const handleFetchCustomerAddress = async () => {
    if (!user) return;
    try {
      const response = await fetchCustomerAddress({
        customer_id: cart?.customer_id,
      }).unwrap();
      if (response) {
        dispatch(addToCustomerAddress(response.data));
        setCustomerAddressDetails(response.data);

        const data: CustomerAddressDataType[] = response.data;
        setDefaultAddress(data.find((item) => item.default_address)); // to the object that has default_address has true
      }
    } catch (error) {
      // showCustomToast({
      //   message:
      //     "Kindly check your internet connection. Please try again later..",
      //   type: "error",
      // });
    }
  };

  const handleConfirmOrder = () => {
    if (user) {
      if (selectedPayment == "wallet") {
        setOpenModal(true);
      } else if (selectedPayment == "paystack") {
        handlePaystackCheckout();
      } else if (selectedPayment == "monify") {
        handleMonifyCheckout();
      } else if (selectedPayment == "blusalt") {
        handleBlusaltCheckout();
      }
    } else {
      showTooltip();
    }
  };

  useEffect(() => {
    if (selectedPayment.length > 0) {
      setDisabled(false);
    }
  }, [selectedPayment]);

  useEffect(() => {
    handleFetchCustomerAddress();
  }, [cart?.customer_id, address]);

  // To fetch for a particular category for recommended products
  const categoryPaginationProduct = {
    per_page: numberOfDisplayedProducts,
    page: 1,
    categoryName: categoryName,
  };

  const fetchAllProductsByCategory = async () => {
    try {
      const res = await getAllProductsByCategory(
        categoryPaginationProduct
      ).unwrap();
      if (res) {
        setCategoryProducts(res.data.products);
        setTotalFetchedCategoryData(res.data.pagination.total);
        setViewMoreLoader(false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Error loading products. Kindly reload..",
      //   type: "error",
      // });
      setViewMoreLoader(false);
    }
  };

  const handleMoreButton = () => {
    setViewMoreLoader(true);
    setNumberOfDisplayedProducts((prev) => prev + 12);
  };

  useEffect(() => {
    if (cartItems) {
      setCategoryName(cartItems[0]?.category_name);
    }

    fetchAllProductsByCategory();
  }, [categoryName, numberOfDisplayedProducts]);

  return (
    <>
      <PageWrapper classname="checkout_main_container">
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
                  <p className="delivery_options_text">Delivery options</p>

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

                {activeDeliveryOption == "Door step" &&
                  (defaultAddress ? ( // if the customer as a default address before
                    <div>
                      {/* Customer Address */}
                      <div className="customer_address_container">
                        <p>Customer Address</p>

                        <div
                          className="customer_change_container"
                          onClick={handleDoorDelivery}
                        >
                          <p>Change</p>
                          <BsChevronRight color="#084C3F" size={15} />
                        </div>
                      </div>

                      {/* Default Address */}
                      <div className="home_details_container">
                        <p>{defaultAddress.address_title}</p>
                        <p>{defaultAddress.city}</p>
                        <p>{defaultAddress.address}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Customer Address */}
                      <div className="customer_address_container">
                        <p>Customer Address</p>

                        <div
                          className="customer_change_container"
                          onClick={handleDoorDelivery}
                        >
                          <p>Add Delivery Address</p>
                          <BsChevronRight color="#084C3F" size={15} />
                        </div>
                      </div>

                      {/* Add delivery address */}
                      <div
                        className="delivery_address"
                        onClick={handleDoorDelivery}
                      >
                        <p>Add Delivery Address</p>
                      </div>
                    </div>
                  ))}

                {activeDeliveryOption == "pickup" &&
                  (selectedAddressDetails ? (
                    <div>
                      {/* Customer Address */}
                      <div className="customer_address_container">
                        <p>Drop off/Pick up Location</p>

                        <div
                          className="customer_change_container"
                          onClick={handlePickupLocation}
                        >
                          <p>Change Pickup Location</p>
                          <BsChevronRight color="#084C3F" size={15} />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="home_details_container">
                        <p>{selectedAddressDetails.city}</p>

                        <p>{selectedAddressDetails.address1}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Drop off/Pick up Location */}
                      <div className="customer_address_container">
                        <p>Drop off/Pick up Location</p>

                        <div
                          className="customer_change_container"
                          onClick={handlePickupLocation}
                        >
                          <p>Select Pickup Location</p>
                          <BsChevronRight color="#084C3F" size={15} />
                        </div>
                      </div>

                      {/* Select Pickup Location */}
                      <div
                        className="delivery_address"
                        onClick={handlePickupLocation}
                      >
                        <p>Select Pickup Location</p>
                      </div>
                    </div>
                  ))}
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
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      />
                      <p>
                        <BsWallet color="#084C3F" /> Wallet
                      </p>
                    </div>
                    <span className="payment_wallet_bal">Bal: ₦0</span>
                  </div>

                  {/* Monnify */}
                  {/* <div
                    className="payment_radio_input_container"
                    style={{ marginTop: "30px" }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="monify"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <img src={payment_monnify_ic} />
                  </div> */}

                  {/* Paystack */}
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

                  {/* Blusalt */}
                  {/* <div
                    className="payment_radio_input_container"
                    style={{ marginTop: "30px" }}
                  >
                    <input
                      type="radio"
                      name="blusalt"
                      value="blusalt"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <img src={blusalt} />
                  </div> */}
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
                {cartItems?.map((item, index) => (
                  <div key={index}>
                    <CheckoutCartItem item={item} />
                  </div>
                ))}
              </div>

              <div style={{ padding: "10px" }} />

              <div className="checkout_subtotal_container">
                <p className="checkout_subtotal_text">Subtotal</p>
                <p className="checkout_subtotal_amount">
                  ₦{formatPrice(Number(cart?.sub_total) || 0)}
                </p>
              </div>

              <div className="checkout_subtotal_container">
                <p className="checkout_subtotal_text">Delivery</p>
                <p className="checkout_subtotal_amount">₦0</p>
              </div>

              <div style={{ border: "0.5px solid #E7E9EB" }} />

              <div className="checkout_subtotal_container">
                <p
                  className="checkout_subtotal_text"
                  style={{ fontWeight: 700 }}
                >
                  Total
                </p>
                <p className="checkout_subtotal_amount">
                  ₦{formatPrice(Number(cart?.grand_total) || 0)}
                </p>
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
                  loader={confirmOrderBtnLoader}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div>
          <ProductSection
            name={"Recommended Products"}
            data={categoryProducts}
            type="related"
            nameContainer
            viewAll
            sectionLoader={categoryLoader}
          />

          {numberOfDisplayedProducts < totalFetchedCategoryData && (
            <button className="view_more_buton" onClick={handleMoreButton}>
              View More
              {viewMoreLoader ? (
                <TailSpin
                  visible={true}
                  height={"20"}
                  width={"20"}
                  color={"white"}
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  strokeWidth={2} // Adjust thickness
                />
              ) : (
                <BsChevronDown size={12} color={"white"} />
              )}
            </button>
          )}
        </div>
      </PageWrapper>

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

      {/* Pickup modal */}
      <PickupLocationModal
        label="pickup"
        isOpen={openPickupModal}
        closeModal={() => setOpenPickupModal(false)}
        setSelectedAddressDetails={setSelectedAddressDetails}
      />

      {/* Delivery modal */}
      <PickupLocationModal
        label="delivery"
        isOpen={openDeliveryModal}
        closeModal={() => setOpenDeliveryModal(false)}
        setDefaultAddress={setDefaultAddress}
      />
    </>
  );
};

export default CheckoutPage;

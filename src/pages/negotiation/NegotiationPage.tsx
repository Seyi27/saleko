import React, { useEffect, useState } from "react";
import "./NegotiationPage.css";
import Footer from "../../components/footer/Footer";
import NavCategories from "../../components/nav-categories/NavCategories";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavHeader from "../../components/nav-header/NavHeader";
import {
  BsCheck2,
  BsChevronLeft,
  BsFillCartFill,
  BsLockFill,
  BsSendFill,
} from "react-icons/bs";
import CustomButton from "../../components/custom-button/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { productData } from "../../helpers/Data";
import CustomModal from "../../components/custom-modal/CustomModal";
import { Product } from "../../types/productTypes";

const NegotiationPage = () => {
  const [bidPrice, setBidPrice] = useState("");
  const [productDetailsData, setProductDetailsData] = useState<Product>();
  const [addToCartdisabled, setAddToCartdisabled] = useState(true);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const [openConfirmNegotiationModal, setOpenConfirmNegotiationModal] =
    useState(false);

  const { itemId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const filterProduct = () => {
    const filteredProducts = productData.find(
      (item) => item.id.toString() === itemId
    );
    setProductDetailsData(filteredProducts);
  };

  useEffect(() => {
    filterProduct();
  }, [itemId]);

  const handleTextInput = (e: any) => {
    if (/^\d*$/.test(e.trim())) {
      // accepts only numbers
      setBidPrice(e.trim());
    }
  };

  const handleNegotiationModal = () => {
    setOpenConfirmNegotiationModal(false);
    setAddToCartdisabled(false);
    setSendButtonDisabled(true);
  };

  return (
    <>
      <div>
        <NavHeader />

        <NavHeaderSearch />

        <NavCategories />

        <div className="body_container">
          <div className="body_second_container">
            <div className="negotiation_main_container">
              <div
                className="negotiation_back_button_container"
                onClick={() => navigate("/")}
              >
                <BsChevronLeft color=" #4B4B4B;" size={15} />
                <p>Back</p>
              </div>

              {/* Negotiation Chat */}
              <div>
                <p style={{ fontWeight: "bold", color: "#4B4B4B" }}>
                  Negotiation
                </p>

                <div className="negotiation_body_container">
                  <div
                    className="negotiation_chat_container"
                    style={{ height: !addToCartdisabled ? "550px" : "" }}
                  >
                    <div>
                      <p className="negotiation_header_text">
                        Negotiation Begins
                      </p>

                      <hr
                        style={{
                          border: "0.5px solid #E7E9EB",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    </div>

                    <div className="negotiation_chatbody_container">
                      <div className="negotiation_chatbody">chat</div>

                      <div>
                        <hr
                          style={{
                            border: "0.5px solid #E7E9EB",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        />

                        <div className="negotiation_chatbody_bottom_container">
                          <div className="bid_price_container">
                            <p>Enter Bid Price:</p>

                            <input
                              value={bidPrice}
                              placeholder="Enter Bid Price e.g ₦350,000"
                              className="bid_price_input"
                              style={{ backgroundColor: !addToCartdisabled ? "#DADADA" : "" }}
                              disabled={!addToCartdisabled}
                              inputMode="numeric"
                              onChange={(e) => handleTextInput(e.target.value)}
                            />

                            {sendButtonDisabled ? (
                              <button className="cancel_button">
                                Closed{"   "}
                                <BsLockFill size={15} />
                              </button>
                            ) : (
                              <button className="send_button">
                                Send{"   "}
                                <BsSendFill />
                              </button>
                            )}
                          </div>

                          <button
                            className="accept_offer_button"
                            onClick={() => setOpenConfirmNegotiationModal(true)}
                          >
                            Accept Offer{"   "}
                            <BsCheck2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div
                    className="negotiation_product_details_container"
                    style={{ height: !addToCartdisabled ? "550px" : "" }}
                  >
                    <p className="negotiation_header_text">Product Details</p>

                    <div style={{ marginTop: "25px" }}>
                      <img
                        src={productDetailsData?.productImages?.[0].medium_image_url}
                        className="negotiated_item_image"
                      />

                      <p className="negotiated_item_name">
                        {productDetailsData?.name}
                      </p>
                      <p className="negotiated_item_property">
                        Original Price:{" "}
                        <span style={{ textDecorationLine: "line-through" }}>
                          ₦{productDetailsData?.price}
                        </span>{" "}
                        each
                      </p>
                      <p className="negotiated_item_property">
                        Quantity: x{state.negotiated_quantity}
                      </p>
                      <p className="negotiated_item_property">
                        Vendor: SmithField
                      </p>
                      <p className="negotiated_item_property">
                        Negotiation Status:{" "}
                        <span style={{ color: "#084c3f" }}>
                          Ongoing Negotiation
                        </span>
                      </p>
                      <p className="negotiated_item_property">
                        Negotiated Price:{" "}
                        <span style={{ color: "red" }}>₦650,000 each</span>
                      </p>

                      <CustomButton
                        label="Add To Cart"
                        width={"70%"}
                        height="50px"
                        bgColor="#084C3F"
                        textColor="white"
                        fontSize={15}
                        fontWeight={600}
                        disabled={addToCartdisabled}
                        icon={<BsFillCartFill color="white" size={19} />}
                        // onClick={handleSubmit}
                      />
                    </div>

                    {!addToCartdisabled && (
                      <p className="negotiated_expiry_text">
                        This negotiated price would last till: 2023-05-05
                        05:04pm. Kindly purchase the product before the expiry
                        time, otherwise the price would be reversed to the
                        actual price.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <CustomModal
        label="confirm_negotiation_modal"
        item={productDetailsData}
        isOpen={openConfirmNegotiationModal}
        closeModal={() => setOpenConfirmNegotiationModal(false)}
        onclick={handleNegotiationModal}
        quantity={state.negotiated_quantity}
      />
    </>
  );
};

export default NegotiationPage;

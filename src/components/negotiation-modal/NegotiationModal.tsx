import React, { useEffect, useState } from "react";
import "./NegotiationModal.css";
import { BsX } from "react-icons/bs";
import CustomTextInput from "../custom-textInput/CustomTextInput";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import { NegotiationModalProp } from "../../types/types";
import { formatPrice } from "../../helpers/helper";

const NegotiationModal = ({
  isOpen,
  closeModal,
  item,
}: NegotiationModalProp) => {
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const [quantityError, setQuantityError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (quantity && amount && !quantityError && !amountError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [quantity, amount, quantityError, amountError]);

  const totalAmount = Number(quantity) * Number(amount);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "quantity":
        if (!e.trim()) {
          setQuantityError("The minimum quantity for negotiation is 2");
          setQuantity(""); // Clear the quantity state
        } else if (/^\d+$/.test(e.trim())) {
          setQuantity(e.trim());
          setQuantityError(""); // Clear the error
        } else {
          setQuantityError(
            "The Number of products field may only contain numeric characters"
          );
        }
        break;
      case "amount":
        if (!e.trim()) {
          setAmountError("The Quote product price field is required");
          setAmount(""); // Clear the amount state
        } else if (/^\d+(\.\d{0,2})?$/.test(e.trim())) {
          setAmount(e.trim());
          setAmountError(""); // Clear the error
        } else {
          setAmountError("The Quote product price field must be numeric and may contain decimal points");
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    const data = {
      negotiated_quantity: quantity,
    };
    navigate(`/negotiate/${item?.id}`, { state: data });
  };

  return (
    <div className="negotiation_modal_overlay" onClick={handleOverlayClick}>
      <div className="negotiation_modal_content">
        <div className="negotiation_modal_header">
          <p>Negotiate Product</p>
          <BsX size={20} onClick={closeModal} style={{ cursor: "pointer" }} />
        </div>

        <hr style={{ border: "0.5px solid #C1C7DE" }} />

        <div className="negotiate_item_details_container">
          <img src={item?.productImages?.[0].medium_image_url} className="negotiation_item_image" />

          <div className="negotiate_item_details_body">
            <p>{item?.name}</p>

            <p>Original Price: ₦{formatPrice(item?.price ?? 0)}</p>
          </div>
        </div>

        <div>
          <div>
            <p className="negotiation_label">
              How many would you like to purchase?
              <span style={{ color: "red" }}>*</span>
            </p>

            <input
              className={`negotiation_text_input ${quantityError && 'error_textInput'}`}
              placeholder="Enter number of products e.g 5"
              value={quantity}
              inputMode="numeric"
              onChange={(e) => handleTextInput("quantity", e.target.value)}
            />
            {quantityError && (
              <span className="negotiation_error_message">{quantityError}</span>
            )}
          </div>

          <div style={{ padding: "12px" }} />

          <div>
            <p className="negotiation_label">
              How much are you willing to pay for each?
              <span style={{ color: "red" }}>*</span>
            </p>

            <input
              className={`negotiation_text_input ${amountError && 'error_textInput'}`}
              placeholder="e.g 400,000"
              value={amount}
              onChange={(e) => handleTextInput("amount", e.target.value)}
            />
            {amountError && (
              <span className="negotiation_error_message">{amountError}</span>
            )}
          </div>

          <div style={{ padding: "5px" }} />

          <p>
            Total Price:{" "}
            <span style={{ fontWeight: "bold" }}>₦{totalAmount}</span>
          </p>

          <div style={{ padding: "5px" }} />

          <CustomButton
            label="Negotiate"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            disabled={buttonDisabled}
            onClick={handleSubmit}
            // loader={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default NegotiationModal;

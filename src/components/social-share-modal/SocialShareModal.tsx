import React, { useState } from "react";
import "./SocialShareModal.css";
import { BsX } from "react-icons/bs";
import logos_whatsapp from "../../assets/images/svg/logos_whatsapp.svg";
import logos_facebook from "../../assets/images/svg/logos_facebook.svg";
import logos_twitter from "../../assets/images/svg/logos_twitter.svg";
import logos_instagram from "../../assets/images/svg/logos_instagram.svg";
import logos_mail from "../../assets/images/svg/logos_mail.svg";
import CustomButton from "../custom-button/CustomButton";

const SocialShareModal = ({ isOpen, closeModal }: any) => {
  const [copyLink, setCopyLink] = useState(
    "https://dev.saleko.ng/marketplace/seller/profile/shade"
  );
  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="social_share_modal_overlay" onClick={handleOverlayClick}>
      <div className="social_share_modal_content">
        <div>
          <div className="social_share_modal_header">
            <p>Share</p>
            <BsX size={20} onClick={closeModal} style={{ cursor: "pointer" }} />
          </div>

          <hr style={{ border: "0.5px solid #C1C7DE" }} />

          <div className="social_share_logo_links_container">
            <a href="">
              <img src={logos_whatsapp} />
            </a>
            <a href="https://www.facebook.com/saleko.com.ng">
              <img src={logos_facebook} />
            </a>
            <a href="https://x.com/Saleko_ng">
              <img src={logos_twitter} />
            </a>
            <a href="https://www.instagram.com/saleko.ng/">
              <img src={logos_instagram} />
            </a>
            <a>
              <img src={logos_mail} />
            </a>
          </div>

          <div className="social_share_copy_link_container">
            <input
              value={copyLink}
              readOnly
              className="social_share_copy_link_input"
            />
            <CustomButton
              label="Copy"
              width={"17%"}
              height="30px"
              bgColor="#084c3f"
              textColor="white"
              fontSize={12}
              fontWeight={600}
              //   onClick={() => setOpenNegotiationModal(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;

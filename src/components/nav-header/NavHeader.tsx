import React from "react";
import "./NavHeader.css";
import SalekoWhiteLogo from "../../assets/images/svg/SalekoWhiteLogo";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";

const NavHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="body_container nav_header_container">
      <div className="body_second_container nav_header_second_container">
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <SalekoWhiteLogo />
        </div>

        <h3>Buy Boku, Sell Berekete</h3>

        <CustomButton
          label="Sell On Saleko"
          width={"163px"}
          height="51px"
          bgColor="transparent"
          textColor="#FFFFFF"
          borderColor="#FFFFFF"
          borderWidth="1px"
          borderRadius="100px"
          fontWeight={600}
          fontSize={16}
        />
      </div>
    </div>
  );
};

export default NavHeader;

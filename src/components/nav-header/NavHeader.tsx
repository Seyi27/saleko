import React from "react";
import "./NavHeader.css";
import SalekoWhiteLogo from "../../assets/images/svg/SalekoWhiteLogo";
import CustomButton from "../custom-button/CustomButton";

const NavHeader = () => {
  return (
    <div className="nav_header_container">
      <div className="nav_header_second_container">
        <SalekoWhiteLogo />

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

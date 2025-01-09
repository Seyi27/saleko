import React from "react";
import "./AuthNavHeader.css";
import CustomButton from "../../custom-button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { AuthNavHeaderProps } from "../../../types/types";
import SalekoGreenLogo from "../../../assets/images/svg/SalekoGreenLogo";

const AuthNavHeader = ({ noLogoDisplay, auth }: AuthNavHeaderProps) => {
  const navigate = useNavigate();

  const handleNavToLogin = () => {
    navigate("/login");
  };

  const handleNavToSignup = () => {
    navigate("/sign-up");
  };

  return (
    <div
      className={`${
        auth === "forgotPassword" ? "nav_container" : "nav_container_auth"
      }`}
    >
      <div className={`${noLogoDisplay && "display_image_none"}`}>
        <Link to="/">
          <SalekoGreenLogo />
        </Link>
      </div>

      {noLogoDisplay && <div className="placeholder_div" />}

      {auth == "login" && (
        <CustomButton
          label={"Sign Up"}
          width="92px"
          height="37px"
          bgColor="white"
          textColor="#084C3F"
          borderWidth="1px"
          borderColor="#084C3F"
          borderRadius="5px"
          onClick={handleNavToSignup}
        />
      )}

      {(auth == "signup" || auth == "forgotPassword") && (
        <CustomButton
          label={"Login"}
          width="92px"
          height="37px"
          bgColor="white"
          textColor="#084C3F"
          borderWidth="1px"
          borderColor="#084C3F"
          borderRadius="5px"
          onClick={handleNavToLogin}
        />
      )}
    </div>
  );
};

export default AuthNavHeader;

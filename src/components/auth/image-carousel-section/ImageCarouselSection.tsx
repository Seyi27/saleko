import React from "react";
import { LoginBackground, SalekoBackgroundFrame } from "../../../assets/images";
import "./ImageCarouselSection.css";
import CarouselComponent from "../carousel-component/CarouselComponent";
import SalekoWhiteLogo from "../../../assets/images/svg/SalekoWhiteLogo";
import { Link } from "react-router-dom";

const ImageCarouselSection = () => {
  return (
    <div className="left_container">
      <img src={SalekoBackgroundFrame} className="background_image_green" />

      <div className="logo_container">
        <Link to="/">
          <SalekoWhiteLogo />
        </Link>
      </div>

      <div className="carousel_container">
        <CarouselComponent />
      </div>
    </div>
  );
};

export default ImageCarouselSection;

import React, { useState } from "react";
import "./SignUp.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SignupCarousel from "../../components/carousel-component/CarouselComponent";
import ImageCarouselSection from "../../components/image-carousel-section/ImageCarouselSection";
import { palette } from "../../theme/palette";
import CustomButton from "../../components/custom-button/CustomButton";
import LoginForm from "../../components/login-form/LoginForm";
import { Outlet, useNavigate } from "react-router-dom";
import AuthNavHeader from "../../components/auth-nav-header/AuthNavHeader";

const SignUp = () => {
  return (
    <div className="main_container">
      {/* left container */}
      <ImageCarouselSection />

      {/* right container */}
      <div className="signup_right_container">
        <AuthNavHeader noLogoDisplay auth="signup" />

        {/* <SignupForm /> */}
        <Outlet/>
      </div>
    </div>
  );
};

export default SignUp;

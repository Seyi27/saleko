import React from "react";
import ImageCarouselSection from "../../components/auth/image-carousel-section/ImageCarouselSection";
import CustomButton from "../../components/custom-button/CustomButton";
import LoginForm from "../../components/auth/login-form/LoginForm";
import { useNavigate } from "react-router-dom";
import AuthNavHeader from "../../components/auth/auth-nav-header/AuthNavHeader";
import './Login.css'

const Login = () => {  
  return (
    <div className="main_container">
      {/* left container */}
      <ImageCarouselSection />

      {/* right container */}
      <div className="login_right_container">
        <AuthNavHeader noLogoDisplay auth="login"/>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

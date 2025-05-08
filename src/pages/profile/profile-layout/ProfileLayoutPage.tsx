import React, { useEffect, useState } from "react";
import "./ProfileLayoutPage.css";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";
import { Outlet } from "react-router-dom";
import saleko_img7 from "../../../assets/images/all_Images/saleko_img7.png";
import ProfileSidebar from "../../../components/profile-sidebar/ProfileSidebar";

const ProfileLayoutPage = () => {
  return (
    <PageWrapper classname="profile_layout_wrapper">
      <div className="profile_layout_body_container">
        <div className="profile_sidebar_outter_wrapper">
          <ProfileSidebar />
        </div>

        <Outlet></Outlet>
      </div>

      <div style={{ padding: "20px" }} />

      <img src={saleko_img7} className="homeframe7_img" />
    </PageWrapper>
  );
};

export default ProfileLayoutPage;

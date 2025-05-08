import React, { useEffect, useState } from "react";
import "./DeliveryAddressPage.css";
import CustomButton from "../../../components/custom-button/CustomButton";
import { BsArrowLeft, BsGeoAltFill, BsPlusLg } from "react-icons/bs";
import DeliveryAddressItem from "../../../components/delivery-address-item/DeliveryAddressItem";
import { countryCallingCodes } from "../../../helpers/CountryCallingCodes";
import { BiSolidNavigation } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const DeliveryAddressPage = () => {
  const [view, setView] = useState<"all_address" | "add_address">(
    "all_address"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressTitle: "",
    state: "",
    city: "",
    streetAddress: "",
    building: "",
    buildingNumber: "",
    noteToDriver: "",
    saveAsDefault: false,
  });
  const [selectedCode, setSelectedCode] = useState("+234");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If the value is a string, it must not be empty or just spaces (i.e., val.trim() !== "").
  const isFormValid = Object.values(formData).every(
    (val) => String(val).trim() !== ""
  );

  // Update the state when the window resizes
  useEffect(() => {
    // Function to update the state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener when the component unmounts
    };
  }, []);

  const address = useSelector(
    (state: RootState) => state.address.customerAddress
  );

  const renderAllAddress = () => (
    <div className="profile_outlet_wrapper">
      <div className="profile_outlet_header_container">
        <span className="profile_outlet_header_text">Delivery Addresses</span>
        <CustomButton
          label="Add New"
          width={windowWidth > 600 ? "12%" : "30%"}
          height="35px"
          bgColor="#084C3F"
          textColor="white"
          fontSize={12}
          fontWeight={600}
          icon={<BsPlusLg />}
          borderRadius="6px"
          onClick={() => setView("add_address")}
        />{" "}
      </div>

      <div className="profile_outlet_body_container">
        {address.length > 0 ? (
          address.map((item, index) => (
            <DeliveryAddressItem item={item} index={index} />
          ))
        ) : (
          <div className="no_delivery_address_text">
            <p>No Delivery Addresses</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAddAddress = () => (
    <div className="profile_outlet_wrapper">
      <div
        className="add_address_header_container"
        onClick={() => setView("all_address")}
      >
        <BsArrowLeft />
        <span className="profile_outlet_header_text">Add New Address</span>
      </div>

      <div className="profile_outlet_body_container">
        {/* Contact Information */}
        <div>
          <label className="add_address_form_label">Contact Information</label>
          <div className="add_address_form_row_container">
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="fullName"
                className="add_address_form_input"
                placeholder="Enter your full name*"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="add_address_phone_input_container">
              <select
                id="country-code"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                style={{
                  padding: "5px",
                  margin: "0 0 0 10px",
                  backgroundColor: "#084c3f",
                  borderRadius: "3px",
                  color: "white",
                  border: "none",
                  outline: "none",
                }}
              >
                {countryCallingCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phoneNumber"
                className="add_address_phone_input"
                placeholder="Phone number*"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: "20px" }} />

        {/* Address Details */}
        <div>
          <label className="add_address_form_label">Address Details</label>
          <div className="add_address_form_row_container">
            {/* Address title */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="addressTitle"
                className="add_address_form_input"
                placeholder="Enter address title*"
                value={formData.addressTitle}
                onChange={handleInputChange}
              />
            </div>

            {/* State */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="state"
                className="add_address_form_input"
                placeholder="Select state*"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add_address_form_row_container">
            {/* City/town* */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="city"
                className="add_address_form_input"
                placeholder="Enter city/town*"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            {/* Street address */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="streetAddress"
                className="add_address_form_input"
                placeholder="Street address*"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add_address_form_row_container">
            {/* Building */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="building"
                className="add_address_form_input"
                placeholder="Enter building"
                value={formData.building}
                onChange={handleInputChange}
              />
            </div>

            {/* Building number */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="buildingNumber"
                className="add_address_form_input"
                placeholder="Enter house number and street address*"
                value={formData.buildingNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: "20px" }} />

        {/* Note to Driver */}
        <div>
          <label className="add_address_form_label">Note to Driver</label>
          <br></br>

          <input
            type="text"
            name="noteToDriver"
            className="add_address_noteToDriver_input"
            placeholder="Delivery Instructions (Optional)"
            value={formData.noteToDriver}
            onChange={handleInputChange}
          />
        </div>

        {/* Radio container */}
        <div className="add_address_radio_container">
          <input
            type="radio"
            name="saveAsDefault"
            checked={formData.saveAsDefault}
            onChange={handleInputChange}
          />
          <div>
            <span>Set as default address</span>
            <p>This will be used as your default shipping address</p>
          </div>
        </div>

        {/* Current location */}
        <div className="add_address_location_container">
          <BsGeoAltFill color="#084c3f" />

          <div>
            <span className="add_address_location_text1">
              Use My Current Location
            </span>
            <p className="add_address_location_text2">
              Let us auto-fill your address details using your device location
            </p>

            <div className="add_address_location_button">
              <CustomButton
                label="Get My Location"
                width={"50%"}
                height="35px"
                bgColor="#084C3F0D"
                textColor="#084c3f"
                fontSize={12}
                fontWeight={600}
                icon={<BiSolidNavigation color="#084c3f" />}
                borderRadius="6px"
                borderColor="#084C3F"
                borderWidth={"1px"}
                onClick={() => setView("add_address")}
              />
            </div>
          </div>
        </div>

        {/* Map location */}
        <div className="add_address_map_container"></div>

        <div className="add_address_button_container">
          <CustomButton
            label="Cancel"
            width={windowWidth > 600 ? "10%" : "30%"}
            height="35px"
            bgColor="white"
            textColor="#374151"
            fontSize={12}
            fontWeight={600}
            borderRadius="6px"
            borderColor="#D1D5DB"
            borderWidth={"1px"}
            onClick={() => setView("all_address")}
          />

          <CustomButton
            label="Save Address"
            width={windowWidth > 600 ? "15%" : "40%"}
            height="35px"
            bgColor="#084c3f"
            textColor="white"
            fontSize={12}
            fontWeight={600}
            borderRadius="6px"
            onClick={() => setView("add_address")}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      {view == "all_address" && renderAllAddress()}
      {view == "add_address" && renderAddAddress()}
    </div>
  );
};

export default DeliveryAddressPage;

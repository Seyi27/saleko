import React, { useEffect, useState } from "react";
import "./PickupLocationModal.css";
import { BsArrowLeft } from "react-icons/bs";
import {
  useAddCustomerAddressMutation,
  useFetchPickupLocationQuery,
  useLazyFetchCustomerAddressQuery,
} from "../../services/appApi";
import {
  CustomerAddressDataType,
  PickupLocationType,
} from "../../types/appTypes";
import CustomButton from "../custom-button/CustomButton";
import { Dispatch, SetStateAction } from "react";
import location_img from "../../assets/images/svg/location_img.svg";
import address_location from "../../assets/images/svg/address_location.svg";
import { TailSpin } from "react-loader-spinner";
import { countryCallingCodes } from "../../helpers/CountryCallingCodes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { showCustomToast } from "../custom-toast/CustomToast";

type PickupModalProps = {
  label: "pickup" | "delivery";
  isOpen?: boolean;
  closeModal: () => void;
  setSelectedAddressDetails?: Dispatch<
    SetStateAction<PickupLocationType | undefined>
  >;
  setDefaultAddress?: Dispatch<
    SetStateAction<CustomerAddressDataType | undefined>
  >;
};

const PickupLocationModal = ({
  label,
  isOpen,
  closeModal,
  setSelectedAddressDetails,
  setDefaultAddress,
}: PickupModalProps) => {
  const [view, setView] = useState<
    "pickup" | "delivery" | "delivery_info_form"
  >(label); // to be able to switch the states internally
  const [pickupLocationData, setPickupLocationData] =
    useState<PickupLocationType[]>();
  const [tempPickupLocationData, setTempPickupLocationData] =
    useState<PickupLocationType>(); // to hold it temporarily

  const [tempDeliveryData, setTempDeliveryData] =
    useState<CustomerAddressDataType>(); // to hold it temporarily

  const [selectedPickupRadio, setSelectedPickupRadio] = useState("");
  const [selectedDeliveryRadio, setSelectedDeliveryRadio] = useState("");
  const { isSuccess, data, isLoading } = useFetchPickupLocationQuery({});
  const [selectedCode, setSelectedCode] = useState("+234");
  const [createCustomerAddressloader, setCreateCustomerAddressloader] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
    buildingNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    addressTitle: "",
    noteToDriver: "",
    saveAsDefault: false,
  });

  const address = useSelector(
    (state: RootState) => state.address.customerAddress
  );
  const cart = useSelector((state: RootState) => state.cart.user_cart);
  const [createCustomerAddress] = useAddCustomerAddressMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If the value is a boolean (i.e., saveAsDefault), it must be true.
  // If the value is a string, it must not be empty or just spaces (i.e., val.trim() !== "").
  const isFormValid = Object.values(formData).every(
    (val) => String(val).trim() !== ""
  );

  useEffect(() => {
    if (isSuccess) {
      setPickupLocationData(data.data);
    }
  }, [isOpen, closeModal, isSuccess]);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handlePickupOption = (item: PickupLocationType) => {
    setSelectedPickupRadio(item.city);
    setTempPickupLocationData(item);
  };

  const handleSelectedPickupLocation = () => {
    if (tempPickupLocationData) {
      setSelectedAddressDetails?.(tempPickupLocationData);
      closeModal();
    }
  };

  const handleDeliveryOption = (
    name: string,
    item?: CustomerAddressDataType
  ) => {
    setSelectedDeliveryRadio(name);
    setTempDeliveryData(item);
  };

  const handleSelectedDeliveryLocation = () => {
    if (tempDeliveryData) {
      setDefaultAddress?.(tempDeliveryData);
      closeModal();
    }
  };

  const handleCreateCustomerAddress = async () => {
    setCreateCustomerAddressloader(true);
    try {
      const response = await createCustomerAddress({
        customer_id: cart?.customer_id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phoneNumber,
        company_name: formData.companyName,
        building_no: formData.buildingNumber,
        street_address: formData.streetAddress,
        address_title: formData.addressTitle,
        city: formData.city,
        state: formData.state,
        default_address: formData.saveAsDefault ? 1 : 0,
        note: formData.noteToDriver,
      }).unwrap();
      if (response) {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          companyName: "",
          buildingNumber: "",
          streetAddress: "",
          addressTitle: "",
          city: "",
          state: "",
          saveAsDefault: false,
          noteToDriver: "",
        });
        showCustomToast({
          message: response.message,
          type: "success",
        });
        // setView("delivery");
        setCreateCustomerAddressloader(false);
        closeModal();
      }
    } catch (error: any) {
      if (error?.status === 409) {
        showCustomToast({
          message: error?.data?.message,
          type: "error",
        });
      }
      setCreateCustomerAddressloader(false);
    }
  };

  let contentBody = null;

  switch (view) {
    case "pickup":
      contentBody = isLoading ? (
        <TailSpin
          visible={true}
          height={"20"}
          width={"20"}
          color={"white"}
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
          strokeWidth={2} // Adjust thickness
        />
      ) : (
        <div>
          <div className="close_container" onClick={closeModal}>
            <BsArrowLeft />
            <span>Checkout</span>
          </div>

          <div className="pickup_header_container">
            <p style={{ fontSize: "20px" }}>Drop off/Pick up Location</p>
          </div>

          <div className="pickuplocation_container">
            {pickupLocationData?.map((item, index) => (
              <div
                key={index}
                className="pickuplocation_item"
                onClick={() => handlePickupOption(item)}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <input
                    type="radio"
                    checked={selectedPickupRadio == item.city}
                  />

                  <div>
                    <p className="pickuplocation_city">{item.city}</p>
                    <p className="pickuplocation_address1">{item.address1}</p>
                  </div>
                </div>

                <div>
                  <p className="pickuplocation_hrs">Opening Hours</p>
                  <p className="pickuplocation_time">8am to 7pm</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pickuplocation_button">
            <CustomButton
              label="Select location"
              width={"100%"}
              height="55px"
              bgColor="#084C3F"
              textColor="white"
              fontSize={16}
              fontWeight={600}
              onClick={handleSelectedPickupLocation}
            />
          </div>
        </div>
      );
      break;

    case "delivery":
      contentBody = (
        <div>
          <div className="close_container" onClick={closeModal}>
            <BsArrowLeft />
            <span>Checkout</span>
          </div>

          <div className="pickup_header_container">
            <p
              style={{ fontSize: "20px", color: "#4F4F4F", fontWeight: "bold" }}
            >
              Delivery Address
            </p>
          </div>

          <div>
            <div className="add_new_address_pill">
              <CustomButton
                label="Add a new address"
                width={"100%"}
                height="40px"
                bgColor="#eff8f6"
                textColor="#084c3f"
                fontSize={14}
                fontWeight={700}
                onClick={() => setView("delivery_info_form")}
              />
            </div>

            <div className="delivery_location_container">
              <div
                className="other_address_pill"
                onClick={() => handleDeliveryOption("current")}
              >
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <img src={location_img} />
                  <p>Current Location</p>
                </div>
                <input
                  type="radio"
                  checked={selectedDeliveryRadio == "current"}
                />
              </div>

              {address.map((item: CustomerAddressDataType, index) => (
                <div
                  className="other_address_pill"
                  onClick={() => handleDeliveryOption(`${item.address}`, item)}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img src={address_location} />
                    <div>
                      {item.address_title && <p>{item.address_title}</p>}
                      <span>
                        {item.address},{item.state}
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={selectedDeliveryRadio == `${item.address}`}
                  />
                </div>
              ))}
            </div>

            <div className="pickuplocation_button">
              <CustomButton
                label="Confirm"
                width={"100%"}
                height="55px"
                bgColor="#084C3F"
                textColor="white"
                fontSize={16}
                fontWeight={600}
                onClick={handleSelectedDeliveryLocation}
              />
            </div>
          </div>
        </div>
      );
      break;

    case "delivery_info_form":
      contentBody = (
        <div>
          <div className="close_container" onClick={() => setView("delivery")}>
            <BsArrowLeft />
            <span> Delivery Address</span>
          </div>

          <div className="pickup_header_container">
            <p
              style={{ fontSize: "20px", color: "#4F4F4F", fontWeight: "bold" }}
            >
              Delivery Information
            </p>
          </div>

          <div className="delivery_info_form">
            <div className="delivery_info_form_row_container">
              {/* First Name */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="firstName"
                  className="delivery_info_form_input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Last Name */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="lastName"
                  className="delivery_info_form_input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="delivery_info_form_row_container">
              {/* Phone Number */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <div className="delivery_info_phone_input_container">
                  <select
                    id="country-code"
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    style={{
                      padding: "5px",
                      margin: "0 0 0 5px",
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
                    className="delivery_info_phone_input"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Company’s Name */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  Company’s Name <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="companyName"
                  className="delivery_info_form_input"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company’s name"
                />
              </div>
            </div>

            <div className="delivery_info_form_row_container">
              {/* Building number */}
              <div style={{ width: "50%" }}>
                <label className="delivery_info_form_label">
                  Building number <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="buildingNumber"
                  className="delivery_info_form_input"
                  value={formData.buildingNumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* Street Address */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  Street Address <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="streetAddress"
                  className="delivery_info_form_input"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="delivery_info_form_row_container">
              {/* City */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="city"
                  className="delivery_info_form_input"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* State */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="state"
                  className="delivery_info_form_input"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="delivery_info_form_row_container">
              {/* Address Title */}
              <div style={{ width: "70%" }}>
                <label className="delivery_info_form_label">
                  Address Title <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="addressTitle"
                  className="delivery_info_form_input"
                  value={formData.addressTitle}
                  onChange={handleInputChange}
                />
              </div>

              {/* Note to Driver */}
              <div style={{ width: "100%" }}>
                <label className="delivery_info_form_label">
                  Note to Driver <span style={{ color: "red" }}>*</span>
                </label>
                <br></br>
                <input
                  type="text"
                  name="noteToDriver"
                  className="delivery_info_form_input"
                  value={formData.noteToDriver}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="delivery_info_radio_container">
              <input
                type="radio"
                name="saveAsDefault"
                checked={formData.saveAsDefault}
                onChange={handleInputChange}
              />
              <span>Save address as default</span>
            </div>

            <div className="delivery_info_button">
              <CustomButton
                label="Save"
                width={"100%"}
                height="50px"
                bgColor="#084c3f"
                textColor="white"
                fontSize={14}
                fontWeight={700}
                disabled={!isFormValid}
                onClick={handleCreateCustomerAddress}
                loader={createCustomerAddressloader}
              />
            </div>
          </div>
        </div>
      );
      break;
    // contentBody = <Text>No content available</Text>;
  }

  return (
    <div className="pickup_modal_overlay" onClick={handleOverlayClick}>
      <div className="pickup_modal_content">{contentBody}</div>
    </div>
  );
};

export default PickupLocationModal;

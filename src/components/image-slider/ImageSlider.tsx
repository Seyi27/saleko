import React, { useState } from "react";
import "./ImageSlider.css";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { ProductImage, ProductImageProp } from "../../types/productTypes";

const ImageSlider = ({ images }: ProductImageProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider_container">
      <div className="slider">
        <img
          src={images[currentIndex].local_url ?? saleko_green}
          alt={`Slide ${currentIndex}`}
          className="slider_image"
        />
      </div>
      <button className="slider_button left" onClick={handlePrev}>
        <BsCaretLeftFill />
      </button>
      <button className="slider_button right" onClick={handleNext}>
        <BsCaretRightFill />
      </button>
    </div>
  );
};

export default ImageSlider;

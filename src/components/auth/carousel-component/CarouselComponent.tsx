import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./CarouselComponent.css";
import { Frame1, Frame2, Frame3, Frame4 } from "../../../assets/images";


const CarouselComponent = () => {
  const slides = [
    {
      image: Frame1,
      header: "Welcome to Saleko!",
      text: "Discover a world of diverse products and vendors at your fingertips. Get the best deals and a seamless shopping experience all in one place.",
    },
    {
      image: Frame2,
      header: "Negotiate Prices",
      text: "Find the best deals and negotiate prices directly with sellers. Get the products you love at the prices you want.",
    },
    {
      image: Frame3,
      header: "Search by Market",
      text: "Explore products from various markets. Whether you're looking for local treasures or international goods, Saleko has it all.",
    },
    {
      image: Frame4,
      header: "Swift Delivery",
      text: "Enjoy fast and reliable delivery services. Your purchases will reach you swiftly and securely.",
    },
  ];

  return (
    <Carousel
      autoPlay={true}
      interval={2000}
      infiniteLoop
      showIndicators={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
    >
      {slides.map((slide, index) => (
        <div key={index}>
          <img src={slide.image} alt={`Slide ${index + 1}`} className='carousel_image'/>
          <p className="image_headerText">{slide.header}</p>
          <p className="image_text">{slide.text}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;

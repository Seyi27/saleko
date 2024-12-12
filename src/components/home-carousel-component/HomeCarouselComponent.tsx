import React from "react";
import "./HomeCarouselComponent.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  HomeFrame1,
  HomeFrame2,
  HomeFrame3,
  HomeFrame4,
  HomeFrame5,
  HomeFrame6,
} from "../../assets/images";

const HomeCarouselComponent = () => {
  const slides = [
    {
      image: HomeFrame1,
    },
    {
      image: HomeFrame2,
    },
    {
      image: HomeFrame3,
    },
    {
      image: HomeFrame4,
    },
    {
      image: HomeFrame5,
    },
    {
      image: HomeFrame6,
    },
  ];

  return (
    <div className="home_carousel_container">
      <Carousel
        autoPlay={true}
        interval={2000}
        infiniteLoop
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="custom_carousel"
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="image_slides"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarouselComponent;

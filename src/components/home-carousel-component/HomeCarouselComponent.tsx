import React from "react";
import "./HomeCarouselComponent.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  HomeFrame1,
  HomeFrame2,
  HomeFrame3,
  HomeFrame4,
} from "../../assets/images";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  ];

  return (
    <div className="home_carousel_container">
      <Carousel
        autoPlay={true}
        interval={2000}
        infiniteLoop
        showIndicators={true}
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="custom_carousel"
        renderArrowPrev={(clickHandler, hasPrev) =>
          hasPrev && (
            <button className="custom-arrow left" onClick={clickHandler}>
              <BsChevronLeft size={24} />
            </button>
          )
        }
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <button className="custom-arrow right" onClick={clickHandler}>
              <BsChevronRight size={24} />
            </button>
          )
        }
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              // className="image_slides"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarouselComponent;

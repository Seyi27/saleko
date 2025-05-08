import React, { useEffect, useState } from "react";
import "./HomeCarouselComponent.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import saleko_img1 from "../../assets/images/all_Images/saleko_img1.jpg";
import saleko_img2 from "../../assets/images/all_Images/saleko_img2.jpg";
import saleko_img3 from "../../assets/images/all_Images/saleko_img3.jpg";
import saleko_img4 from "../../assets/images/all_Images/saleko_img4.jpg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useFetchBannerQuery } from "../../services/appApi";
import { SliderItem } from "../../types/appTypes";

const HomeCarouselComponent = () => {
  const altSlides = [
    {
      image: saleko_img1,
    },
    {
      image: saleko_img2,
    },
    {
      image: saleko_img3,
    },
    {
      image: saleko_img4,
    },
  ];

  const [bannerSlides, setBannerSlides] = useState<SliderItem[]>([]);

  const { data, isSuccess } = useFetchBannerQuery("slider");

  useEffect(() => {
    if (isSuccess) {
      setBannerSlides(data.data);
    }
  }, [data, isSuccess]);

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
        {bannerSlides
          ? bannerSlides.map((slide, index) => (
              <div key={index}>
                <img
                  src={slide.image_url}
                  alt={`Slide ${index + 1}`}
                  // className="image_slides"
                />
              </div>
            ))
          : altSlides.map((slide, index) => (
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

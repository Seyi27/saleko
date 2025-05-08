import React, { useState } from "react";
import "./ComponentSlideshow.css";
import { CategoryDataChildrenProp, CategoryDataProp, CategoryDataPropType } from "../../types/types";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSwipeable } from "react-swipeable"; // Import swipe handler

// Create a reusable component to render a batch of items
const ComponentBatch: React.FC<{ items: CategoryDataChildrenProp[]; name: string }> = ({
  items,
  name,
}) => (
  <div>
    <p className="component_header_text">{name}</p>
    <div className="component_item_wrapper">
      {items.map((item, index) => (
        <div className="component_item" key={index}>
          <img
            src={item.image ?? saleko_green}
            className="component_item_image"
            alt={item.name}
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const ComponentSlideshow = ({ data }: CategoryDataPropType) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Split data into chunks of 16
  const components = [];
  for (let i = 0; i < data.children.length; i += 16) {
    components.push(
      <ComponentBatch
        key={i}
        items={data.children.slice(i, i + 16)}
        name={data.name}
      />
    );
  }

  const handleNext = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Swipe handling
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="component_slideshow_wrapper" {...handlers}>
      <div className="component_container">{components[currentIndex]}</div>

      {/* Only show navigation buttons if more than one component exists */}
      {components.length > 1 && (
        <>
          {/* Left Arrow: Only show if not on the first slide */}
          {currentIndex > 0 && (
            <button
              className="component_slider_button button_left"
              onClick={handlePrev}
            >
              <BiChevronLeft size={25} />
            </button>
          )}

          {/* Right Arrow: Only show if not on the last slide */}
          {currentIndex < components.length - 1 && (
            <button
              className="component_slider_button button_right"
              onClick={handleNext}
            >
              <BiChevronRight size={25} />
            </button>
          )}
        </>
      )}

      {/* Indicator dots */}
      {components.length > 1 && (
        <div className="indicator_dots">
          {components.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentSlideshow;

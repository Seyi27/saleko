import React, { useRef, useState } from "react";
import "./NavCategories.css";
import { BsChevronDown, BsChevronRight, BsFire, BsGrid } from "react-icons/bs";
import CategoriesIcon from "../../assets/images/svg/CategoriesIcon";
import { categoriesData } from "../../helpers/Data";
import { CategoryData } from "../../types/types";

const NavCategories = () => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<
    CategoryData | undefined
  >(categoriesData[0]);

  const handleDropdownHover = (name: string) => {
    const hoverResult = categoriesData.find(
      (dataName) => dataName.name === name
    );
    setHoveredCategory(hoverResult);
  };

  return (
    <div>
      {visibleDropdown && <div className="category_background_overlay"></div>}

      <div className="body_container nav_categories_container">
        <div className="body_second_container nav_categories_second_container">
          <div
            className="categories_icon_container"
            onMouseEnter={() => setVisibleDropdown(true)}
            onMouseLeave={() => setVisibleDropdown(false)}
          >
            <BsGrid color="#FFFFFF" size={20} />
            <p>Categories</p>
            <BsChevronDown color="#FFFFFF" size={15} />
          </div>

          <div className="categories_items_container">
            <p>
              <BsFire color="red" /> Hot Deals
            </p>
            <p>Fashion</p>
            <p>Beauty & Personal Care</p>
            <p>Electronics</p>
            <p>Household Items & Kitchen Utensils</p>
            <p>Computer & Accessories</p>
            <p>Phones & Tablets Items</p>
            <p>Food & Drinks</p>
          </div>


          {visibleDropdown && (
            <div
              className="category_dropdown"
              onMouseEnter={() => setVisibleDropdown(true)}
              onMouseLeave={() => setVisibleDropdown(false)}
            >
              <div className="category_dropdown_left_column">
                {categoriesData.map((item, index) => (
                  <div
                    key={index}
                    className="category_item_container"
                    onMouseEnter={() => handleDropdownHover(item.name)}
                  >
                    <span className="category_item">{item.name}</span>
                    <BsChevronRight size={10} />
                  </div>
                ))}
              </div>

              <hr style={{ border: "0.5px solid #e5e7eb", height: "98%" }} />

              <div className="category_dropdown_right_column">
                <div className="category_dropdown_right_column_header">
                  <p>{hoveredCategory?.name}</p>
                  <BsChevronRight size={15} color="#084C3F" />
                </div>

                <div className="category_dropdown_right_column_item_container">
                  {hoveredCategory?.subcategories?.map((item, index) => (
                    <div
                      className="category_dropdown_right_column_item_inner_container"
                      key={index}
                    >
                      <img
                        src={item.image}
                        className="category_dropdown_right_item_image"
                      />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavCategories;

import React, { useEffect, useRef, useState } from "react";
import "./NavCategories.css";
import { BsChevronDown, BsChevronRight, BsFire, BsGrid } from "react-icons/bs";
import CategoriesIcon from "../../assets/images/svg/CategoriesIcon";
import { CategoryDataProp } from "../../types/types";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { useNavigate } from "react-router-dom";
import { useFetchAllCategoriesQuery } from "../../services/appApi";

const NavCategories = () => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoryDataProp[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryDataProp>();
  const navigate = useNavigate();

  const { data, isSuccess } = useFetchAllCategoriesQuery({});

  useEffect(() => {
    if (isSuccess) {
      setCategoryData(data.data);
      setHoveredCategory(data.data[0]);
    }
  }, [data]);

  console.log("data data", data)

  const handleClickedCategory = () => {
    const categoryName = hoveredCategory?.name ?? "";
    navigate(`/category?q=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div>
      {visibleDropdown && categoryData?.length > 0 && (
        <div className="background_overlay"></div>
      )}

      <div className="body_container nav_categories_container">
        <div className="body_second_container nav_categories_second_container">
          <div
            className="categories_icon_container"
            onMouseEnter={() => setVisibleDropdown(true)}
            onMouseLeave={() => setVisibleDropdown(false)}
          >
            <BsGrid size={20} />
            <p>Categories</p>
            <BsChevronDown size={15} />
          </div>

          <div className="categories_items_container">
            <p>
              <BsFire color="red" /> Hot Deals
            </p>
            {categoryData.slice(0, 7).map((item, index) => (
              <p
                key={index}
                onClick={() =>
                  navigate(`/category?q=${encodeURIComponent(item.name)}`)
                }
              >
                {item.name}
              </p>
            ))}
          </div>

          {visibleDropdown && categoryData?.length > 0 && (
            <div
              className="category_dropdown"
              onMouseEnter={() => setVisibleDropdown(true)}
              onMouseLeave={() => setVisibleDropdown(false)}
            >
              {/* left column */}
              <div className="category_dropdown_left_column">
                {categoryData?.map((item, index) => (
                  <div
                    key={index}
                    className="category_item_container"
                    onMouseEnter={() => setHoveredCategory(item)}
                  >
                    <span className="category_item">{item.name}</span>
                    <BsChevronRight size={10} />
                  </div>
                ))}
              </div>

              <hr style={{ border: "0.5px solid #e5e7eb", height: "98%" }} />

              {/* right column */}
              <div className="category_dropdown_right_column">
                <div className="category_dropdown_right_column_header">
                  <p>{hoveredCategory?.name}</p>
                  <BsChevronRight size={15} color="#084C3F" />
                </div>

                <div className="category_dropdown_right_column_item_container">
                  {hoveredCategory?.children?.map((item, index) => (
                    <div
                      className="category_dropdown_right_column_item_inner_container"
                      key={index}
                      onClick={handleClickedCategory}
                    >
                      <img
                        src={item.image ?? saleko_green}
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

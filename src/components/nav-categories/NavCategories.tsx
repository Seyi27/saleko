import React from "react";
import "./NavCategories.css";
import { BsChevronDown, BsFire, BsGrid } from "react-icons/bs";
import CategoriesIcon from "../../assets/images/svg/CategoriesIcon";

const NavCategories = () => {
  return (
    <div className="nav_categories_container">
      <div className="nav_categories_second_container">
        <div className="categories_icon_container">
          <BsGrid color="#FFFFFF" size={20} />
          <p>Categories</p>
          <BsChevronDown color="#FFFFFF" size={15} />
        </div>

        <div className="categories_items_container">
          <p>
            <BsFire color="red" />
            {" "}{" "}
            Hot Deals
          </p>
          <p>Fashion</p>
          <p>Beauty & Personal Care</p>
          <p>Electronics</p>
          <p>Household Items & Kitchen Utensils</p>
          <p>Computer & Accessories</p>
          <p>Phones & Tablets Items</p>
          <p>Food & Drinks</p>
        </div>
      </div>
    </div>
  );
};

export default NavCategories;

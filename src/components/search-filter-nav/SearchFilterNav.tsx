import React from "react";
import "./SearchFilterNav.css";
import { BsChevronDown, BsFire } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";

const SearchFilterNav = () => {
  return (
    <div className="body_container search_filter_nav_container">
      <div className="body_second_container search_filter_nav_second_container">
        {" "}
        <div className="search_item_container">
          <BiFilterAlt color="#8e8e8e" size={16} />
          <p>Filters</p>
        </div>
        <div
          className="search_item_container"
          style={{ backgroundColor: "white" }}
        >
          <BsFire color="#8e8e8e" />
          <p>Deal</p>
        </div>
        <div className="search_item_container">
          <p>Sort by: Price (High to Low)</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Category</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Brands</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Sizes</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Colors</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Customer Reviews</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Market</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
        <div className="search_item_container">
          <p>Stores</p>
          <BsChevronDown color="#8e8e8e" size={12} />
        </div>
      </div>
    </div>
  );
};

export default SearchFilterNav;

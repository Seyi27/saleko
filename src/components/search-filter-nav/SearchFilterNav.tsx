import React, { useEffect, useRef, useState } from "react";
import "./SearchFilterNav.css";
import { BsChevronDown, BsFire } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import CustomButton from "../custom-button/CustomButton";
import Filter from "../filter/Filter";

const filterCategories: Record<string, string[]> = {
  // Filters: ["New Arrivals", "On Sale", "Top Rated"],
  Deals: ["50% Off", "Buy 1 Get 1 Free"],
  "Sort by: Price (High to Low)": ["Ascending", "Descending"],
  Category: ["Electronics", "Clothing", "Shoes"],
  Brands: ["Nike", "Adidas", "Apple"],
  Sizes: ["S", "M", "L", "XL"],
  Colors: ["Red", "Blue", "Green", "Gray", "Yellow", "Orange"],
  "Customer Reviews": ["5 Star", "4 Star", "3 Star"],
  Market: ["USA", "Europe", "Asia"],
  Stores: ["Amazon", "eBay", "Walmart"],
};

const SearchFilterNav = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterDropdownState, setFilterDropdownState] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: Set<string>;
  }>({});
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filterItem: string) => {
    setFilterDropdownState((prev) =>
      selectedFilter === filterItem ? !prev : true
    );
    setSelectedFilter((prev) => (prev === filterItem ? null : filterItem));
  };

  const handleCategorySelect = (filter: string, category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev[filter] || []);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return { ...prev, [filter]: newSet };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownState(false);
        setSelectedFilter(null);
      }
    };

    if (filterDropdownState) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterDropdownState]);

  return (
    <>
      <div className="body_container">
        <div className="body_second_container search_filter_nav_container">
          <div className="search_filter_nav_item_wrapper">
            <div
              className="search_item_container"
              onClick={() => setOpenFilterModal(true)}
            >
              <BiFilterAlt color="#8e8e8e" size={16} />
              <p
                // className={`${
                //   filterItem === selectedFilter ||
                //   selectedCategories[filterItem]?.size
                //     ? "selected_item"
                //     : "filter_item_text"
                // }`}
                className="selected_item"
              >
                {/* {filterItem}{" "}
              {selectedCategories[filterItem]?.size
                ? `(${selectedCategories[filterItem].size})`
                : ""} */}
                Filter
              </p>
            </div>

            {Object.keys(filterCategories).map((filterItem, index) => (
              <div
                key={index}
                className={`search_item_container ${
                  filterItem === "Deals" ? "background_trans" : ""
                }`}
                ref={selectedFilter === filterItem ? buttonRef : null}
                onClick={() => handleFilterClick(filterItem)}
              >
                {/* {filterItem === "Filters" && (
                  <BiFilterAlt color="#8e8e8e" size={16} />
                )} */}

                {filterItem === "Deals" && <BsFire color="#8e8e8e" />}

                <p
                  className={`${
                    filterItem === selectedFilter ||
                    selectedCategories[filterItem]?.size
                      ? "selected_item"
                      : "filter_item_text"
                  }`}
                >
                  {filterItem}{" "}
                  {selectedCategories[filterItem]?.size
                    ? `(${selectedCategories[filterItem].size})`
                    : ""}
                </p>

                {filterItem !== "Filters" && filterItem !== "Deals" && (
                  <BsChevronDown
                    color={filterItem === selectedFilter ? "black" : "#8e8e8e"}
                    size={12}
                  />
                )}
              </div>
            ))}
          </div>

          {filterDropdownState && selectedFilter && (
            <div className="filter_dropdown_container" ref={dropdownRef}>
              <div className="filter_category_container">
                {filterCategories[selectedFilter]?.map((category: any) => (
                  <div
                    key={category}
                    onClick={() =>
                      handleCategorySelect(selectedFilter, category)
                    }
                    className={
                      selectedCategories[selectedFilter]?.has(category)
                        ? "selected_filter_category_item"
                        : "filter_category_item"
                    }
                  >
                    <span
                      className={
                        selectedCategories[selectedFilter]?.has(category)
                          ? "selected_filter_category_item_name"
                          : "filter_category_item_name"
                      }
                    >
                      {category}
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="filter_dropdown_btn_container">
                <CustomButton
                  label="Reset"
                  width={"150px"}
                  height="40px"
                  bgColor="white"
                  textColor="#084C3F"
                  fontSize={12}
                  fontWeight={600}
                  borderColor="#084C3F"
                  borderWidth="1"
                  borderRadius="5px"
                  onClick={() =>
                    setSelectedCategories((prev) => ({
                      ...prev,
                      [selectedFilter]: new Set(),
                    }))
                  }
                />

                <CustomButton
                  label="Show 1000+ Results"
                  width={"150px"}
                  height="40px"
                  bgColor="#084C3F"
                  textColor="white"
                  fontSize={12}
                  fontWeight={600}
                  borderRadius="5px"
                />
              </div>
            </div>
          )}
        </div>
      </div>


      <Filter
        isOpen={openFilterModal}
        closeModal={() => setOpenFilterModal(false)}
      />
    </>
  );
};

export default SearchFilterNav;

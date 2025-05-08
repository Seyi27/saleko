import React from "react";
import "./PageWrapper.css";
import Footer from "../footer/Footer";
import NavCategories from "../nav-categories/NavCategories";
import NavHeaderSearch from "../nav-header-search/NavHeaderSearch";
import NavHeader from "../nav-header/NavHeader";
import { PageWrapperPropType } from "../../types/types";
import SearchFilterNav from "../search-filter-nav/SearchFilterNav";
import SearchBar from "../search-bar/SearchBar";

const PageWrapper = ({
  classname,
  filterNav,
  children,
}: PageWrapperPropType) => {
  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <div className="pagewrapper_searchbar">
        <SearchBar />
      </div>

      {filterNav ? <SearchFilterNav /> : <NavCategories />}

      <div className="body_container">
        <div className={`body_second_container ${classname}`}>{children}</div>
      </div>

      <Footer />
    </>
  );
};

export default PageWrapper;

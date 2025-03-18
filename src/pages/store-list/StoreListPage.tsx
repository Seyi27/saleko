import React, { useState } from "react";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import SearchFilterNav from "../../components/search-filter-nav/SearchFilterNav";
import "./StoreListPage.css";
import Footer from "../../components/footer/Footer";
import seller_list_img from "../../assets/images/svg/seller_list_img.svg";
import { BsSearch } from "react-icons/bs";
import saleko_img7 from "../../assets/images/all_Images/saleko_img7.png";
import { storelistdata } from "../../helpers/Data";
import Pagination from "../../components/pagination/Pagination";
import StoreListCard from "../../components/store-list-card/StoreListCard";

const StoreListPage = () => {
  const [storeSearch, setStoreSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20; // Number of items per page

  const currentData = storelistdata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <NavHeader />

      <NavHeaderSearch />

      <SearchFilterNav />

      <div className="body_container">
        <div className="body_second_container store_list_main_container">
          <div>
            <img src={seller_list_img} className="store_list_img" />
          </div>

          {/* Search input container */}
          <div className="store_list_search_input_container">
            <BsSearch size={15} />
            <input
              value={storeSearch}
              onChange={(e) => setStoreSearch(e.target.value)}
              className="store_list_search_input"
              placeholder="Search for products or store name"
            />
          </div>

          {/* Search cardlist */}
          <div className="store_cardlist_section">
            {currentData.map((item, index) => (
              <div key={index}>
                <StoreListCard item={item} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div>
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={storelistdata}
            />
          </div>

          <div style={{ padding: "20px" }} />

          <div className="store_list_img2_container">
            <img src={saleko_img7} className="store_list_img2" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StoreListPage;

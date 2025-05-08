import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import SearchFilterNav from "../../components/search-filter-nav/SearchFilterNav";
import Footer from "../../components/footer/Footer";
import TopStoreSection from "../../components/top-store-section/TopStoreSection";
import { productData, storeData } from "../../helpers/Data";
import ProductSection from "../../components/product-section/ProductSection";
import { useLocation } from "react-router-dom";
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import {
  useLazyGetAllProductsByNameQuery,
  useLazyGetTopSellerQuery,
} from "../../services/productsApi";
import { Product } from "../../types/productTypes";
import { TailSpin } from "react-loader-spinner";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { StoreType } from "../../types/types";
import { BsChevronDown } from "react-icons/bs";

const SearchPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const [searchedProductData, setSearchedProductData] = useState<Product[]>([]);
  const query = searchParams.get("q");

  const [topSellerData, setTopSellerData] = useState<StoreType[]>();
  const [topSellerLoader, setTopSellerLoader] = useState(false);

  const [totalFetchedCategoryData, setTotalFetchedCategoryData] =
    useState<number>(0);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] =
    useState<number>(12);
  const [viewMoreLoader, setViewMoreLoader] = useState(false);

  const [getAllProductsByName, { isLoading: searchProductLoader }] =
    useLazyGetAllProductsByNameQuery();

  const [getTopSeller] = useLazyGetTopSellerQuery();

  const namePaginationProduct = {
    per_page: numberOfDisplayedProducts,
    page: 1,
    name: query,
  };

  const fetchAllProductsByName = async () => {
    try {
      const res = await getAllProductsByName(namePaginationProduct).unwrap();
      if (res) {
        setSearchedProductData(res.data.products);
        setTotalFetchedCategoryData(res.data.pagination.total);
        setViewMoreLoader(false);
      }
    } catch (error: any) {
      if (error.status == 404) {
        // means that there is no product
        setSearchedProductData([]);
      } else {
        showCustomToast({
          message: "Error loading products. Kindly reload..",
          type: "error",
        });
        setViewMoreLoader(false);
      }
    }
  };

  // top seller api call
  const handleTopSellerApiCall = async () => {
    setTopSellerLoader(true);

    const homePaginationProduct = {
      per_page: 6,
      page: 1,
    };

    try {
      const res = await getTopSeller(homePaginationProduct).unwrap();
      if (res) {
        setTopSellerData(res.data);
        setTopSellerLoader(false);
      }
    } catch (error) {
      // showCustomToast({
      //   message:
      //     "Failed to load best seller products. Please try again later..",
      //   type: "error",
      // });
      setTopSellerLoader(true);
    }
  };

  const handleMoreButton = () => {
    setViewMoreLoader(true);
    setNumberOfDisplayedProducts((prev) => prev + 12);
  };

  useEffect(() => {
    fetchAllProductsByName();
    handleTopSellerApiCall();
  }, [query, numberOfDisplayedProducts]);

  return (
    <PageWrapper classname="search_content_wrapper" filterNav>
      {searchProductLoader ? (
        <div className="loader_container">
          <TailSpin
            visible={true}
            height={"50"}
            width={"50"}
            color={"#084C3F"}
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidth={5} // Adjust thickness
          />
        </div>
      ) : (
        <>
          {searchedProductData.length > 0 ? (
            <ProductSection data={searchedProductData} type="related" />
          ) : (
            <div>
              <p className="no_results_text">
                There are no results for "{query}"
              </p>
            </div>
          )}

          {numberOfDisplayedProducts < totalFetchedCategoryData && (
            <button className="view_more_buton" onClick={handleMoreButton}>
              View More
              {viewMoreLoader ? (
                <TailSpin
                  visible={true}
                  height={"20"}
                  width={"20"}
                  color={"white"}
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  strokeWidth={2} // Adjust thickness
                />
              ) : (
                <BsChevronDown size={12} color={"white"} />
              )}
            </button>
          )}

          <TopStoreSection
            name={"Top Stores"}
            data={topSellerData}
            sectionLoader={topSellerLoader}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default SearchPage;

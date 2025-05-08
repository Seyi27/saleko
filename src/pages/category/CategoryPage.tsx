import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSection from "../../components/product-section/ProductSection";
import { productData } from "../../helpers/Data";
import { useFetchCategoriesQuery } from "../../services/appApi";
import { CategoryDataProp } from "../../types/types";
import ComponentSlideshow from "../../components/component-slideshow/ComponentSlideshow";
import { useLazyGetAllProductsByCategoryQuery } from "../../services/productsApi";
import { Product } from "../../types/productTypes";
import { TailSpin } from "react-loader-spinner";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { BsChevronDown } from "react-icons/bs";

const CategoryPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("q");

  const [selectedCategory, setSelectedCategory] = useState<CategoryDataProp>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const [totalFetchedCategoryData, setTotalFetchedCategoryData] =
    useState<number>(0);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] =
    useState<number>(12);
  const [viewMoreLoader, setViewMoreLoader] = useState(false);

  const { data, isSuccess } = useFetchCategoriesQuery({});
  const [getAllProductsByCategory, { isLoading: categoryLoader }] =
    useLazyGetAllProductsByCategoryQuery();

  const categoryPaginationProduct = {
    per_page: numberOfDisplayedProducts,
    page: 1,
    categoryName: query,
  };

  const fetchAllProductsByCategory = async () => {
    try {
      const res = await getAllProductsByCategory(
        categoryPaginationProduct
      ).unwrap();
      if (res) {
        setCategoryProducts(res.data.products);
        setTotalFetchedCategoryData(res.data.pagination.total);
        setViewMoreLoader(false);
      }
    } catch (error) {
      showCustomToast({
        message: "Error loading products. Kindly reload..",
        type: "error",
      });
      setViewMoreLoader(false);
    }
  };

  const handleMoreButton = () => {
    setViewMoreLoader(true);
    setNumberOfDisplayedProducts((prev) => prev + 12);
  };

  useEffect(() => {
    if (isSuccess) {
      const catdata: CategoryDataProp[] = data?.data;
      const result = catdata.find((item) => item.name === query);

      setSelectedCategory(result);
    }

    fetchAllProductsByCategory();
  }, [data, query, numberOfDisplayedProducts]);

  return (
    <PageWrapper classname="category_wrapper" filterNav>
      {selectedCategory && <ComponentSlideshow data={selectedCategory} />}

      <ProductSection
        data={categoryProducts}
        type="related"
        sectionLoader={categoryLoader}
      />

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
    </PageWrapper>
  );
};

export default CategoryPage;

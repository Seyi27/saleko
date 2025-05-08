import React, { useEffect } from "react";
import "./ProductSection.css";
import { ProductSectionProps } from "../../types/types";
import ProductCard from "../product-card/ProductCard";
import { BsArrowRight } from "react-icons/bs";
import { chunkArray } from "../../helpers/helper";
import { Product } from "../../types/productTypes";
import ProductCardSkeleton from "../product-cart-skeleton/ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

const ProductSection = ({
  name,
  data,
  type,
  nameContainer,
  viewAll,
  sectionLoader,
}: ProductSectionProps) => {
  const displayProductData = Array.isArray(data) ? data.slice(0, 6) : []; // to check if data is an array and Limit to the first 6 products

  const chunkArrayRowData = chunkArray(data ?? [], 6);

  const navigate = useNavigate();

  let contentbody = null;

  if (sectionLoader) {
    return (
      <div className="product_section_row">
        <ProductCardSkeleton cards={6} />
      </div>
    );
  }

  switch (type) {
    case "home":
      contentbody = (
        <div className="product_section_container extra_space">
          <div className="name_container">
            <span>{name}</span>

            <div
              className="view_container"
              onClick={() => {
                if (viewAll) {
                  navigate(`/category?q=${encodeURIComponent(viewAll)}`);
                }
              }}
            >
              <span>View All</span>
              <BsArrowRight size={12} />
            </div>
          </div>

          <hr style={{ border: "0.5px solid #e5e7eb" }} />

          <div className="product_section_row">
            {displayProductData?.map((item, index) => (
              <div key={index} className="product_card_container">
                <ProductCard item={item} name={name} />

                {index < displayProductData.length - 1 && (
                  <hr className="product_divider product_section_divider" />
                )}

                {/* {index % 2 === 0 && index < displayProductData.length - 1 && (
                  <hr className="mobile_divider product_section_divider" />
                )} */}
              </div>
            ))}
          </div>
        </div>
      );
      break;

    // Using chunkArrayRowData
    case "related":
      contentbody = (
        <div className="product_section_container">
          {nameContainer && (
            <>
              <div className="name_container">
                <span>{name}</span>

                {viewAll && (
                  <div className="view_container">
                    <span>View All</span>
                    <BsArrowRight size={12} />
                  </div>
                )}
              </div>

              <hr style={{ border: "0.5px solid #e5e7eb" }} />
            </>
          )}

          <div>
            {chunkArrayRowData.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`${
                  row.length < 6
                    ? "product_section_row_to_remove_space" // for the remaining rows that are lower than 5 in a row
                    : "product_section_row"
                }`}
              >
                {" "}
                {/* for if the items in a row is less than 6, so as to remove 'justify-content: space-between;' */}
                {row.map((item: Product, index: number) => (
                  <div key={index} className="product_card_container">
                    <ProductCard item={item} name={name} />

                    {index < row.length - 1 && (
                      <hr className="product_divider product_section_divider" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
      break;

    // Using normal data and not chunkArray
    // case "related":
    //   contentbody = (
    //     <div className="product_section_container">
    //       <div className="name_container">
    //         <span>{name}</span>

    //         {viewAll && (
    //           <div className="view_container">
    //             <span>View All</span>
    //             <BsArrowRight size={12} />
    //           </div>
    //         )}
    //       </div>

    //       <hr style={{ border: "0.5px solid #e5e7eb" }} />

    //       <div className={"product_section_row"}>
    //         {data?.map((item: Product, index: number) => (
    //           <div key={index} className="product_card_container">
    //             <ProductCard item={item} name={name} />

    //             {index < data.length - 1 && (
    //               <hr className="product_divider product_section_divider" />
    //             )}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
    //   break;

    default:
      break;
  }
  return contentbody;
};

export default ProductSection;

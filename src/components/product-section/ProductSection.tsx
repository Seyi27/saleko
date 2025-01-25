import React, { useEffect } from "react";
import "./ProductSection.css";
import { Product, ProductSectionProps } from "../../types/types";
import ProductCard from "../product-card/ProductCard";
import { BsArrowRight } from "react-icons/bs";
import { chunkArray } from "../../helpers/helper";

const ProductSection = ({
  name,
  data,
  type,
  visibleRows,
  setRowData,
  viewAll,
}: ProductSectionProps) => {
  const displayProductData = data.slice(0, 5); // Limit to the first 6 products

  const rowData = chunkArray(data, 5);
  console.log("rowData rowData", rowData.slice(0, visibleRows));

  useEffect(() => {
    setRowData?.(rowData);
  }, [setRowData]);

  let contentbody = null;

  switch (type) {
    case "home":
      contentbody = (
        <div className="product_section_container">
          <div className="name_container">
            <span>{name}</span>

            <div className="view_container">
              <span>View All</span>
              <BsArrowRight size={12} />
            </div>
          </div>

          <hr style={{ border: "0.5px solid #e5e7eb" }} />

          <div className="product_section_row">
            {displayProductData.map((item, index) => (
              <div key={index} className="product_card_container">
                <ProductCard item={item} name={name} />

                {index < displayProductData.length - 1 && (
                  <hr
                    style={{ border: "0.5px solid #e5e7eb", height: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case "related":
      contentbody = (
        <div className="product_section_container">
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

          <div>
            {rowData.slice(0, visibleRows).map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`${
                  row.length < 5
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
                      <hr
                        style={{
                          border: "0.1px solid #e5e7eb",
                          height: "100%",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
      break;

    default:
      break;
  }
  return contentbody;
};

export default ProductSection;

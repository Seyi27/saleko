import React from "react";
import "./ProductSection.css";
import { ProductSectionProps } from "../../types/types";
import ProductCard from "../product-card/ProductCard";
import { BsArrowRight } from "react-icons/bs";

const ProductSection = ({ name, data }: ProductSectionProps) => {
  const displayProductData = data.slice(0, 6); // Limit to the first 6 products

  return (
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
              <hr style={{ border: "0.5px solid #e5e7eb", height: "100%" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;

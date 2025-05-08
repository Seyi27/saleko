import React from "react";
import "./ProductCardSkeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ProductCardSkeletonProp = {
  cards: number;
};

const ProductCardSkeleton = ({ cards }: ProductCardSkeletonProp) => {
  return (
    <div className="skeleton_wrapper">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div className="skeleton_main_container">
            <Skeleton height={180} borderRadius={15} />

            <div>
              <Skeleton style={{ marginTop: "40px" }} />
              <Skeleton style={{ marginTop: "20px" }} />

              <Skeleton style={{ marginTop: "10px" }} />
            </div>

            <Skeleton
              height={40}
              width={`100%`}
              borderRadius={20}
              style={{ marginTop: "30px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default ProductCardSkeleton;

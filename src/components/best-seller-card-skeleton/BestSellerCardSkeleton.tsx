import React from "react";
import "./BestSellerCardSkeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type BestSellerCardSkeletonProp = {
  cards: number;
};

const BestSellerCardSkeleton = ({ cards }: BestSellerCardSkeletonProp) => {
  return (
    <div>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <>
            <div className="skeleton_card_container" key={i}>
              <div className="skeleton_image">
                <Skeleton height={130} width={130} borderRadius={15} />
              </div>

              <div className="skeleton_content">
                <Skeleton />

                <Skeleton style={{ marginTop: "10px" }} />

                <Skeleton
                  height={40}
                  width={`100%`}
                  borderRadius={20}
                  style={{ marginTop: "20px" }}
                />
              </div>
            </div>

            <Skeleton height={30} style={{ marginTop: "10px" }}/>
          </>
        ))}
    </div>
  );
};

export default BestSellerCardSkeleton;

import React from "react";
import "./TopStoreSectionSkeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TopStoreSectionSkeletonProp = {
  cards: number;
};

const TopStoreSectionSkeleton = ({ cards }: TopStoreSectionSkeletonProp) => {
  return (
    <div className="skeleton_wrapper">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div className="skeleton_main_container column_center_item">
            <Skeleton height={130} width={130} borderRadius={100} />

            <div>
              <Skeleton style={{ marginTop: "40px" }} height={30} width={170} />
              <Skeleton style={{ marginTop: "20px" }} height={30} width={170} />
            </div>

            <Skeleton
              height={40}
              width={170}
              borderRadius={20}
              style={{ marginTop: "30px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default TopStoreSectionSkeleton;

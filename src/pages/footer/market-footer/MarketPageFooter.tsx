import React, { useEffect, useState } from "react";
import "./MarketPageFooter.css";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";
import { useMarketplaceApiQuery } from "../../../services/appApi";
import saleko_green from "../../../assets/images/svg/saleko_green.svg";
import { MarketplaceDataProps } from "../../../types/types";

const MarketPageFooter = () => {
  const [marketData, setMarketData] = useState<
    MarketplaceDataProps[] | undefined
  >();
  const { data, isSuccess } = useMarketplaceApiQuery({});

  useEffect(() => {
    if (isSuccess) {
      setMarketData(data.data);
    }
    // singleMarketplaceApi(7)
  }, [data, isSuccess]);

  return (
    <PageWrapper classname="market_footer_container">
      <p className="market_footer_title">Markets</p>

      <div style={{ padding: "5px" }} />

      <div className="market_footer_body_wrapper">
        <div style={{ padding: "2px" }} />

        <div>
          <p className="market_footer_text">
            We bring your favourite local markets to your doorstep.
          </p>

          <p className="market_footer_text">Buy Boku </p>

          <p className="market_footer_text">
            Select and shop from your preferred local marketplace.{" "}
          </p>
        </div>

        <div className="market_footer_content">
          {marketData?.map((market, index) => (
            <div key={index} className="market_footer_item">
              <img src={saleko_green} className="market_footer_item_image" />
              <p className="market_footer_item_name">
                {market.name.charAt(0).toUpperCase() +
                  market.name.slice(1).toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: "10px" }} />
      </div>
    </PageWrapper>
  );
};

export default MarketPageFooter;

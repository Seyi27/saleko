import React, { useEffect, useState } from "react";
import "./MarketDropdown.css";
import StoreIconLogo from "../../assets/images/svg/StoreIconLogo";
import { BsCaretDown, BsChevronDown } from "react-icons/bs";
import { MarketplaceDataProps } from "../../types/types";
import { useMarketplaceApiQuery } from "../../services/appApi";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { useLocation, useNavigate } from "react-router-dom";

const MarketDropdown = () => {
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState("Shop by market");
  const [marketData, setMarketData] = useState<
    MarketplaceDataProps[] | undefined
  >();
  const { data, isSuccess } = useMarketplaceApiQuery({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSuccess) {
      setMarketData(data.data);
    }
    // singleMarketplaceApi(7)
  }, [data, isSuccess]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      if (location.pathname.startsWith("/market")) {
        // i.e if the path is /market
        setSelectedMarket(query);
      }
    }
  }, [location]);

  const handleSelectedMarket = (marketname: string) => {
    setSelectedMarket(marketname);
    setShowMarketDropdown(false);

    navigate(`/market?q=${encodeURIComponent(marketname)}`);
  };

  return (
    <div className="market_dropdown_main_container">
      {showMarketDropdown && (
        <div
          className="background_overlay"
          onClick={() => setShowMarketDropdown(false)}
        />
      )}

      <div
        className="select_market_dropdown_container"
        onClick={() => setShowMarketDropdown(!showMarketDropdown)}
      >
        <StoreIconLogo />
        <p>
          {selectedMarket.charAt(0).toUpperCase() +
            selectedMarket.slice(1).toLowerCase()}
        </p>
        <BsChevronDown size={12} />
      </div>

      {showMarketDropdown && (
        <div className="market_dropdown">
          <p className="market_dropdown_title">Shop by Market</p>

          <div className="market_dropdown_content">
            {marketData?.map((market, index) => (
              <div
                key={index}
                className="market_dropdown_item"
                onClick={() => handleSelectedMarket(market.name)}
              >
                <img
                  src={market.image ?? saleko_green}
                  className="market_dropdown_item_image"
                />
                <p className="market_dropdown_item_name">
                  {market.name.charAt(0).toUpperCase() +
                    market.name.slice(1).toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDropdown;

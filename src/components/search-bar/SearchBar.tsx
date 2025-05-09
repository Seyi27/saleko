import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetAllProductsByNameWithoutPaginationQuery } from "../../services/productsApi";
import { Product } from "../../types/productTypes";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(""); // Tracks the search input
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [apiSuggestedSearch, setApiSuggestedSearch] = useState<Product[]>([]);

  const searchBarRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const [getAllProductsByNameWithoutPagination] =
    useLazyGetAllProductsByNameWithoutPaginationQuery();

  const suggestedproducts = [
    {
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      suggestion: "Backpack",
    },
    {
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      suggestion: "Slim Fit T-Shirts ",
    },
    {
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      suggestion: "Mens Cotton Jacket",
    },
    {
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      suggestion: "Mens Casual Slim Fit",
    },
    {
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      suggestion: "Solid Gold Petite Micropave ",
    },
    {
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      suggestion: "White Gold Plated Princess",
    },
    {
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      suggestion: "Portable External Hard Drive ",
    },
    {
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      suggestion: "Gold Plated Stainless Steel",
    },
  ];

  const fetchAllProductsByName = async (value: string) => {
    try {
      const res = await getAllProductsByNameWithoutPagination(value).unwrap();
      if (res) {
        setApiSuggestedSearch(res.data.products);
      }
    } catch (error) {
      // console.log("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true); // Show suggestions as user types
    fetchAllProductsByName(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue.trim() === "") return;

    // Add search value to history if it doesn't already exist
    if (!searchHistory.includes(searchValue)) {
      setSearchHistory((prevHistory) => [...prevHistory, searchValue]);
    }

    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }

    setShowSuggestions(false); // Hide the suggestions
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion); // Set the clicked suggestion to the search bar
    setShowSuggestions(false); // Hide the suggestions
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);

    // Add search value to history if it doesn't already exist
    if (!searchHistory.includes(suggestion)) {
      setSearchHistory((prevHistory) => [...prevHistory, suggestion]);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      if (location.pathname.startsWith("/search")) {
        // i.e if the path is /search
        setSearchValue(query);
      }
    }
  }, [location]);

  return (
    <div className="search_bar_container" ref={searchBarRef}>
      {/* Background overlay */}
      {showSuggestions && (
        <div
          className="background_overlay"
          onClick={() => setShowSuggestions(false)}
        ></div>
      )}

      {/* Search Input */}
      <form onSubmit={handleInputSubmit} style={{ margin: 0, padding: 0 }}>
        <div className="search_container">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onClick={() => setShowSuggestions(true)} // Show suggestions when clicked
            placeholder="Search for products, stores and more"
            className="search_textinput"
          />

          <div className="search_container_right">
            {searchValue.trim() !== "" && (
              <AiFillCloseCircle
                color="#8E8E8E"
                onClick={() => setSearchValue("")}
              />
            )}

            <div className="search_icon" onClick={handleInputSubmit}>
              <BsSearch color="#ffffff" />
            </div>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {/* Show suggestions when input is focused and empty */}
      {showSuggestions && searchValue.trim() === "" && (
        <div className="suggestion_container">
          {searchHistory.length > 0 && (
            <div style={{ paddingBottom: "20px" }}>
              <div className="recently_searched_container">
                <p className="trending_text">Recently searched </p>
                <div onClick={handleClearHistory}>
                  <FaTrashAlt />
                </div>
              </div>
              <div className="trending_suggestion_container">
                {searchHistory.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion_item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="trending_text">Trending right now</p>
            <div className="trending_suggestion_container">
              {suggestedproducts.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion_item"
                  onClick={() => handleSuggestionClick(suggestion.suggestion)}
                >
                  <img src={suggestion.image} className="suggestion_image" />
                  {suggestion.suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Show filtered results when typing */}
      {showSuggestions && searchValue.trim() !== "" && (
        <div>
          {apiSuggestedSearch.length > 0 && (
            <div className="search_suggestion_container">
              {apiSuggestedSearch.map((data, index) => (
                <div
                  key={index}
                  className="search_suggestion_item"
                  onClick={() => handleSuggestionClick(data.name)}
                >
                  <BsSearch />
                  {data.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

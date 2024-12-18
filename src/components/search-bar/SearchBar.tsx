import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(""); // Tracks the search input
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestedSearch, setSuggestedSearch] = useState<any[]>([]);

  const searchBarRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

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

  const fetchData = async (value: string) => {
    await fetch(`http://api.tvmaze.com/search/shows?q=${value}`)
      .then((res) => res.json())
      .then((data) => setSuggestedSearch(data));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true); // Show suggestions as user types
    fetchData(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion); // Set the clicked suggestion to the search bar
    setShowSuggestions(false); // Hide the suggestions

    // Add search value to history if it doesn't already exist
    if (!searchHistory.includes(suggestion)) {
      setSearchHistory((prevHistory) => [...prevHistory, suggestion]);
    }
  };

  const handleInputSubmit = (e: any) => {
    if (searchValue.trim() === "") return;

    // Add search value to history if it doesn't already exist
    if (!searchHistory.includes(searchValue)) {
      setSearchHistory((prevHistory) => [...prevHistory, searchValue]);
    }

    e.preventDefault(); // Prevent the page from refreshing
    setSearchValue("");
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the search bar container
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false); // Hide suggestions
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search_bar_container" ref={searchBarRef}>
      {/* Background overlay */}
      {showSuggestions && <div className="background_overlay"></div>}

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
          {suggestedSearch.length > 0 && (
            <div className="search_suggestion_container">
              {suggestedSearch.map((data, index) => (
                <div
                  key={index}
                  className="search_suggestion_item"
                  onClick={() => handleSuggestionClick(data.show.name)}
                >
                  <BsSearch />
                  {data.show.name}
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

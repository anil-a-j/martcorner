import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getSearchFavoriteShop,
  resetValues,
} from "../../../redux/search/searchSlice";

const SearchFavoriteShop = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const search = (e) => {
    e.preventDefault();
    dispatch(
      getSearchFavoriteShop({
        searchQuery,
        pageSize: 15,
        page: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getSearchFavoriteShop({
        searchQuery,
        pageSize: 15,
        page: 1,
      })
    );
    return () => {
      dispatch(resetValues());
    };
  }, []);

  return (
    <form onSubmit={search}>
      <div className="d-flex container mb-5">
        <input
          type="text"
          className="shadow-sm"
          placeholder="Search shop..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button type="submit" className="search ms-2 shadow-sm">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFavoriteShop;

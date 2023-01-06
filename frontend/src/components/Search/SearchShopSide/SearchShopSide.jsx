import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopSearchProducts,
  resetValues,
} from "../../../redux/search/searchSlice";
import { selectShop } from "../../../redux/shop/shopSlice";

const SearchShopSide = ({ id }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const { shopInfoFulfilled } = useSelector(selectShop);

  const search = (e) => {
    e.preventDefault();
    dispatch(
      getShopSearchProducts({
        searchQuery,
        pageSize: 15,
        page: 1,
        id: id ? id : shopInfoFulfilled._id,
      })
    );
  };

  useEffect(() => {
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
          placeholder="Search product..."
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

export default SearchShopSide;

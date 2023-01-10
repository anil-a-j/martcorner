import React from "react";
import SearchCustomerSide from "../components/Search/SearchCustomerSide/SearchCustomerSide";
import SearchResult from "../components/Search/SearchResult/SearchResult";

const SearchScreen = () => {
  return (
    <div className="container mt-4 pt-5">
      <SearchCustomerSide />
      <SearchResult />
    </div>
  );
};

export default SearchScreen;

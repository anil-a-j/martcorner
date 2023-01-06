import React from "react";
import SearchCustomerSide from "../components/Search/SearchCustomerSide/SearchCustomerSide";
import SearchResult from "../components/Search/SearchResult/SearchResult";

const SearchScreen = () => {
  return (
    <div className="container p-0 my-4">
      <h2 className="my-3 text-center">Search</h2>
      <SearchCustomerSide />
      <SearchResult />
    </div>
  );
};

export default SearchScreen;

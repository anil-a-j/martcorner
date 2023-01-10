import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearch, resetValues } from "../../../redux/search/searchSlice";
import CustomerProductCard from "../../Product/CustomerProductCard/CustomerProductCard";
import ShopCard from "../../Shop/ShopCard/ShopCard";
import CustomerPagination from "../../Pagination/CustomerPagination";
import LoadingWatch from "../../LoadingWatch/LoadingWatch";
import ViewProductPopup from "../../Product/ViewProductPopup/ViewProductPopup";
import { toast } from "react-toastify";
import { selectCustomer } from "../../../redux/customer/customerSlice";
import {
  selectMisc,
  clearAddToFavoriteShop,
  clearRemoveFromFavoriteShop,
} from "../../../redux/misc/miscSlice";

const SearchResult = () => {
  const [pagingation, setPagination] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [productData, setProductData] = useState("");

  const dispatch = useDispatch();
  const {
    customerSearchFulfilled,
    customerSearchPending,
    customerSearchRejected,
  } = useSelector(selectSearch);

  const { customerInfoFulfilled } = useSelector(selectCustomer);

  const createAccountMessage = () => {
    toast.warn("Create customer account to add favorite shops!");
  };

  const viewProductPopup = (product) => {
    setShowProduct(!showProduct);
    setProductData(product);
  };

  const switchProductPopup = () => {
    setShowProduct(!setShowProduct);
  };

  useEffect(() => {
    if (customerSearchFulfilled.shop || customerSearchFulfilled.products) {
      setPagination(true);
    }
    customerSearchFulfilled && dispatch(resetValues());
    customerSearchRejected && toast.error(customerSearchRejected);
  }, [customerSearchRejected, customerSearchFulfilled]);

  const {
    addToFavoriteShopFulfilled,
    removeFromFavoriteShopFulfilled,
    addToFavoriteShopPending,
    removeFromFavoriteShopPending,
  } = useSelector(selectMisc);

  useEffect(() => {
    toast.info(addToFavoriteShopFulfilled.status);
    return () => dispatch(clearAddToFavoriteShop());
  }, [addToFavoriteShopFulfilled]);

  useEffect(() => {
    toast.warn(removeFromFavoriteShopFulfilled.status);
    return () => dispatch(clearRemoveFromFavoriteShop());
  }, [removeFromFavoriteShopFulfilled]);

  return !customerSearchPending ? (
    <div className="mt-3">
      <div className="d-flex flex-wrap justify-content-center">
        {customerSearchFulfilled.shops &&
          customerSearchFulfilled.shops.map((shop, key) => {
            return (
              <ShopCard
                shop={shop}
                key={key}
                createAccountMessage={createAccountMessage}
              />
            );
          })}

        {customerSearchFulfilled.products &&
          customerSearchFulfilled.products.map((product, key) => {
            return (
              <CustomerProductCard
                product={product}
                viewProductPopup={viewProductPopup}
                createAccountMessage={createAccountMessage}
                key={key}
              />
            );
          })}

        {customerSearchFulfilled.pages === 0 && <h5>No Results</h5>}
      </div>
      {pagingation && (
        <CustomerPagination
          customerId={
            customerInfoFulfilled.id ? customerInfoFulfilled.id : null
          }
          pages={customerSearchFulfilled.pages}
          query={customerSearchFulfilled.query}
          page={customerSearchFulfilled.page}
          district={customerSearchFulfilled.district}
          state={customerSearchFulfilled.state}
          searchType={customerSearchFulfilled.searchType}
        />
      )}
      {showProduct && (
        <ViewProductPopup
          data={productData}
          switchProductPopup={switchProductPopup}
        />
      )}
      {/* add or remove favorite shop loading  */}
      {addToFavoriteShopPending ? (
        <LoadingWatch />
      ) : (
        removeFromFavoriteShopPending && <LoadingWatch />
      )}
    </div>
  ) : (
    <LoadingWatch />
  );
};

export default SearchResult;

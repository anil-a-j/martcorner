import React, { useState, useEffect } from "react";
import CustomerProductCard from "../../Product/CustomerProductCard/CustomerProductCard";
import LoadingWatch from "../../LoadingWatch/LoadingWatch";
import ViewProductPopup from "../../Product/ViewProductPopup/ViewProductPopup";
import { useSelector, useDispatch } from "react-redux";
import SearchShopSide from "../../Search/SearchShopSide/SearchShopSide";
import ShopPagination from "../../Pagination/ShopPagination";
import {
  selectSearch,
  getShopSearchProducts,
} from "../../../redux/search/searchSlice";
import { toast } from "react-toastify";

const ShopPageProducts = ({ id }) => {
  const [showProduct, setShowProduct] = useState(false);
  const [productData, setProductData] = useState("");
  const [products, setProducts] = useState("");

  const dispatch = useDispatch();

  const {
    shopSearchProductsFulfilled,
    shopSearchProductsPending,
    shopSearchProductsRejected,
  } = useSelector(selectSearch);

  const viewProductPopup = (product) => {
    setShowProduct(!showProduct);
    setProductData(product);
  };

  const switchProductPopup = () => {
    setShowProduct(!setShowProduct);
  };

  useEffect(() => {
    if (shopSearchProductsFulfilled) {
      setProducts(shopSearchProductsFulfilled.products);
    }
  }, [shopSearchProductsFulfilled]);

  useEffect(() => {
    shopSearchProductsRejected && toast.error(shopSearchProductsRejected);
  }, [shopSearchProductsRejected]);

  useEffect(() => {
    dispatch(
      getShopSearchProducts({ searchQuery: "", pageSize: 15, page: 1, id: id })
    );
  }, [id]);

  return !shopSearchProductsPending ? (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      <div className="w-100">
        <SearchShopSide id={id} />
      </div>
      {products && products.length === 0 && (
        <h4 className="text-center">No products!</h4>
      )}

      {products &&
        products.map((product, key) => {
          return (
            <CustomerProductCard
              product={product}
              viewProductPopup={viewProductPopup}
              key={key}
            />
          );
        })}
      {showProduct && (
        <ViewProductPopup
          data={productData}
          switchProductPopup={switchProductPopup}
        />
      )}
      <div className="w-100">
        {shopSearchProductsFulfilled && (
          <ShopPagination
            pages={shopSearchProductsFulfilled.pages}
            query={shopSearchProductsFulfilled.query}
            page={shopSearchProductsFulfilled.page}
            id={id}
          />
        )}
      </div>
    </div>
  ) : (
    <LoadingWatch />
  );
};

export default ShopPageProducts;

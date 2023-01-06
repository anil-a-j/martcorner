import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopCard from "../components/Shop/ShopCard/ShopCard";
import {
  selectMisc,
  clearAddToFavoriteShop,
  clearRemoveFromFavoriteShop,
} from "../redux/misc/miscSlice";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";
import { toast } from "react-toastify";
import SearchFavoriteShop from "../components/Search/SearchFavoriteShop/SearchFavoriteShop";
import { selectSearch } from "../redux/search/searchSlice";
import FavoriteShopPagination from "../components/Pagination/FavoriteShopPagination";

const FavoriteShopsScreen = () => {
  const dispatch = useDispatch();

  const {
    addToFavoriteShopFulfilled,
    removeFromFavoriteShopFulfilled,
    addToFavoriteShopPending,
    removeFromFavoriteShopPending,
  } = useSelector(selectMisc);

  const { searchFavoriteShopFulfilled } = useSelector(selectSearch);

  useEffect(() => {
    toast.info(addToFavoriteShopFulfilled.status);
    return () => dispatch(clearAddToFavoriteShop());
  }, [addToFavoriteShopFulfilled]);

  useEffect(() => {
    toast.warn(removeFromFavoriteShopFulfilled.status);
    return () => dispatch(clearRemoveFromFavoriteShop());
  }, [removeFromFavoriteShopFulfilled]);

  return (
    <>
      <h4 className="text-center mb-4">My Favorite Shops</h4>
      <SearchFavoriteShop />
      <div className="mt-3 container">
        <div className="d-flex flex-wrap justify-content-center">
          {searchFavoriteShopFulfilled.shops &&
            searchFavoriteShopFulfilled.shops.map((shop, key) => {
              return <ShopCard shop={shop} key={key} />;
            })}
        </div>
        {searchFavoriteShopFulfilled.shops && (
          <FavoriteShopPagination
            pages={searchFavoriteShopFulfilled.pages}
            page={searchFavoriteShopFulfilled.page}
            query={searchFavoriteShopFulfilled.query}
          />
        )}
        {addToFavoriteShopPending ? (
          <LoadingWatch />
        ) : (
          removeFromFavoriteShopPending && <LoadingWatch />
        )}
      </div>
    </>
  );
};

export default FavoriteShopsScreen;

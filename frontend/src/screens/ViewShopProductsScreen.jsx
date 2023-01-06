import React, { useState, useEffect } from "react";
import ShopProductCard from "../components/Product/ShopProductCard/ShopProductCard";
import EditShopProductPopup from "../components/Product/EditShopProductPopup/EditShopProductPopup";
import DeleteShopProductPopup from "../components/Product/DeleteShopProductPopup/DeleteShopProductPopup";
import { selectProduct, resetValues } from "../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";
import ViewProductPopup from "../components/Product/ViewProductPopup/ViewProductPopup";
import SearchShopSide from "../components/Search/SearchShopSide/SearchShopSide";
import {
  selectSearch,
  getShopSearchProducts,
} from "../redux/search/searchSlice";
import { selectShop } from "../redux/shop/shopSlice";
import ShopPagination from "../components/Pagination/ShopPagination";
import { toast } from "react-toastify";

const ViewProductsScreen = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [editData, setEditData] = useState();
  const [deleteId, setDeleteId] = useState();
  const [productData, setProductData] = useState("");
  const [products, setProducts] = useState([]);

  const editProductPopup = (data) => {
    setShowEdit(!showEdit);
    setEditData(data);
  };

  const deleteProductPopup = (_id) => {
    setShowDelete(!showDelete);
    setDeleteId(_id);
  };

  const viewProductPopup = (product) => {
    setShowProduct(!showProduct);
    setProductData(product);
  };

  const switchEditPopup = () => {
    setShowEdit(!showEdit);
  };

  const switchDeletePopup = () => {
    setShowDelete(!showDelete);
  };

  const switchProductPopup = () => {
    setShowProduct(!showProduct);
  };

  const dispatch = useDispatch();

  const { shopSearchProductsFulfilled } = useSelector(selectSearch);
  const { shopInfoFulfilled } = useSelector(selectShop);

  const {
    shopProductsFulfilled,
    shopProductsPending,
    shopProductsRejected,
    deleteProductFulfilled,
    deleteProductRejected,
    editProductStatusFulfilled,
  } = useSelector(selectProduct);

  useEffect(() => {
    dispatch(
      getShopSearchProducts({
        searchQuery: "",
        pageSize: 15,
        page: 1,
        id: shopInfoFulfilled._id,
      })
    );
  }, []);

  useEffect(() => {
    if (editProductStatusFulfilled) {
      let newProducts = products.map((product) => {
        if (product._id === editProductStatusFulfilled.product._id) {
          return editProductStatusFulfilled.product;
        } else {
          return product;
        }
      });

      setProducts(newProducts);
    }
  }, [editProductStatusFulfilled]);

  useEffect(() => {
    if (deleteProductFulfilled) {
      let newProducts = products.filter(
        (product) => product._id !== deleteProductFulfilled.product._id
      );
      setProducts(newProducts);
    }
  }, [deleteProductFulfilled]);

  useEffect(() => {
    if (shopSearchProductsFulfilled) {
      setProducts(shopSearchProductsFulfilled.products);
    }
  }, [shopSearchProductsFulfilled]);

  useEffect(() => {
    shopProductsRejected && toast.error(shopProductsRejected);
    deleteProductRejected && toast.error(deleteProductRejected);
    return () => {
      dispatch(resetValues());
    };
  }, [shopProductsRejected, deleteProductRejected]);

  return (
    <>
      <SearchShopSide />
      {!shopProductsPending ? (
        <div className="d-flex flex-wrap justify-content-center">
          {products.length === 0 && (
            <h4 className="text-center">No products!</h4>
          )}

          {products &&
            products.map((product, key) => {
              return (
                <ShopProductCard
                  key={key}
                  editProductPopup={editProductPopup}
                  deleteProductPopup={deleteProductPopup}
                  product={product}
                  viewProductPopup={viewProductPopup}
                />
              );
            })}
        </div>
      ) : (
        <LoadingWatch />
      )}
      {showEdit && (
        <EditShopProductPopup
          data={editData}
          switchEditPopup={switchEditPopup}
        />
      )}
      {showDelete && (
        <DeleteShopProductPopup
          deleteId={deleteId}
          switchDeletePopup={switchDeletePopup}
        />
      )}
      {showProduct && (
        <ViewProductPopup
          data={productData}
          switchProductPopup={switchProductPopup}
        />
      )}
      {shopProductsFulfilled && (
        <ShopPagination
          pages={shopProductsFulfilled.pages}
          page={shopProductsFulfilled.page}
          id={shopInfoFulfilled._id}
        />
      )}
      {shopSearchProductsFulfilled && (
        <ShopPagination
          pages={shopSearchProductsFulfilled.pages}
          query={shopSearchProductsFulfilled.query}
          page={shopSearchProductsFulfilled.page}
          id={shopInfoFulfilled._id}
        />
      )}
    </>
  );
};

export default ViewProductsScreen;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerSearch } from "../../../redux/search/searchSlice";
import {
  getStates,
  getDistricts,
  getStoreTypes,
  selectMisc,
} from "../../../redux/misc/miscSlice";
import { toast } from "react-toastify";
import { selectCustomer } from "../../../redux/customer/customerSlice";

const SearchCustomerSide = () => {
  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [storeType, setStoreType] = useState("");
  const query = useRef("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [searchType, setSearchType] = useState("");

  const dispatch = useDispatch();

  const {
    storesFulfilled,
    statesFulfilled,
    districtsFulfilled,
    statesError,
    districtsError,
  } = useSelector(selectMisc);

  const { customerInfoFulfilled } = useSelector(selectCustomer);

  const submitSearchProduct = (e) => {
    e.preventDefault();
    if (!state || !district) {
      toast.error("Please fill relevant fields!");
      return false;
    }
    if (!query) {
      toast.error("Select the search type and fill!");
      return false;
    }

    switch (searchType) {
      case "storeType": {
        if (!storeType) {
          toast.error("Please fill Store type");
          return false;
        }
        query.current = storeType;
        break;
      }
      case "productName": {
        if (!productName) {
          toast.error("Please fill Product name");
          return false;
        }
        query.current = productName;
        break;
      }
      case "shopName": {
        if (!shopName) {
          toast.error("Please fill Shop name");
          return false;
        }
        query.current = shopName;
        break;
      }
      default: {
        toast.error("Select the search type and fill!");
        return false;
      }
    }

    dispatch(
      getCustomerSearch({
        customerId: customerInfoFulfilled.id ? customerInfoFulfilled.id : null,
        query: query.current,
        district,
        state,
        searchType,
        pageSize: 15,
        page: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(getStates());
    dispatch(getStoreTypes());
    if (statesError) {
      toast.error(statesError);
    }
    if (districtsError) {
      toast.error(districtsError);
    }
  }, [statesError, districtsError]);

  return (
    <div className="container mt-5 form-box">
      <form
        onSubmit={submitSearchProduct}
        className="d-flex justify-content-center flex-column"
      >
        <div className="row">
          <div className="col-md-6">
            <select
              className="mb-4 mb-md-0"
              onChange={(e) => {
                setState(e.target.value);
                e.target.value !== "" && dispatch(getDistricts(e.target.value));
              }}
            >
              <option value="">Choose your State</option>
              {statesFulfilled &&
                statesFulfilled.map(({ _id, state }, key) => {
                  return (
                    <option key={key} value={_id}>
                      {state}
                    </option>
                  );
                })}
            </select>
          </div>
          <div
            className="col-md-6"
            onClick={() => !state && toast.info("Choose state first!")}
          >
            <select
              disabled={state ? false : true}
              className="mb-4 mb-md-0"
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
              <option value="">Choose your District</option>
              {districtsFulfilled &&
                districtsFulfilled.map(({ _id, district }, key) => {
                  return (
                    <option key={key} value={_id}>
                      {district}
                    </option>
                  );
                })}
            </select>
          </div>
          <small className="w-100 text-center my-2">
            Choose one of these modes
          </small>
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <input
                type="radio"
                name="type"
                className="me-2"
                onChange={() => setSearchType("storeType")}
              />
              <select
                className={` ${
                  searchType === "storeType" ? "" : "bg-transparent"
                }`}
                onChange={(e) => {
                  setStoreType(e.target.value);
                }}
                disabled={searchType === "storeType" ? false : true}
              >
                <option>--- Store Type ---</option>
                {storesFulfilled &&
                  storesFulfilled.map(({ _id, store }, key) => {
                    return (
                      <option key={key} value={_id}>
                        {store}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <input
                type="radio"
                name="type"
                className="me-2"
                onChange={() => setSearchType("productName")}
              />
              <input
                type="text"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                placeholder="Product Name "
                disabled={searchType === "productName" ? false : true}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <input
                type="radio"
                name="type"
                className="me-2"
                onChange={() => setSearchType("shopName")}
              />
              <input
                type="text"
                onChange={(e) => {
                  setShopName(e.target.value);
                }}
                placeholder="Shop Name"
                disabled={searchType === "shopName" ? false : true}
              />
            </div>
          </div>

          <div className="col-md-12">
            <button type="submit" className="shadow-sm w-100 search">
              Submit
            </button>
          </div>
          <div className="w-50 d-block mx-auto d-flex justify-content-center"></div>
        </div>
      </form>
    </div>
  );
};

export default SearchCustomerSide;

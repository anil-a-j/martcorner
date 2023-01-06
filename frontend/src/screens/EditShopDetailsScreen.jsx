import React, { useState, useEffect } from "react";
import { selectShop, resetValuesShop, editShop } from "../redux/shop/shopSlice";
import {
  getStates,
  getStoreTypes,
  getDistricts,
  selectMisc,
} from "../redux/misc/miscSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";
import { validateEmail, validatePhone } from "../utilities/validate/validate";
import "./EditShopDetailsScreen.scss";
import { toast } from "react-toastify";

const EditShopDetailsScreen = () => {
  const [editStatus, setEditStatus] = useState(true);
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  // const [place, setPlace] = useState("");
  // const [state, setState] = useState("");
  // const [district, setDistrict] = useState("");
  const [storeType, setStoreType] = useState("");
  const [aboutShop, setAboutShop] = useState("");
  const [password, setPassword] = useState("");
  const [shopLogo, setShopLogo] = useState("");
  const [shopBanner, setShopBanner] = useState("");

  const {
    shopInfoFulfilled,
    shopInfoRejected,
    editShopRejected,
    editShopPending,
    deleteShopRejected,
  } = useSelector(selectShop);
  const { statesFulfilled, districtsFulfilled, storesFulfilled } =
    useSelector(selectMisc);
  const dispatch = useDispatch();

  const submitEdit = (e) => {
    e.preventDefault();
    if (email && !validateEmail(email)) {
      toast.error("Please check your Email!");
      return false;
    }
    if (phone && !validatePhone(phone)) {
      toast.error("Please check your Phone Number!");
      return false;
    }
    if (password && password.length < 8) {
      toast.error("Password has to be atleast 8 characters!");
      return false;
    }
    // if (state && !district) {
    //   toast.error("Please choose District");
    //   return false;
    // }

    dispatch(
      editShop({
        shopName,
        email,
        phone,
        state: "",
        district: "",
        place: "",
        password,
        storeType,
        shopLogo,
        shopBanner,
        aboutShop,
      })
    );
  };

  useEffect(() => {
    dispatch(getStates());
    dispatch(getStoreTypes());
  }, []);

  useEffect(() => {
    dispatch(resetValuesShop());
    shopInfoRejected && toast.error(shopInfoRejected);
    editShopRejected && toast.error(editShopRejected);
    deleteShopRejected && toast.error(deleteShopRejected);
  }, [shopInfoRejected, editShopRejected, deleteShopRejected, dispatch]);

  return !editShopPending && shopInfoFulfilled ? (
    <div className="container-fluid edit-shop">
      <div className="form-box shadow-sm">
        <div className="my-4 d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">Edit your shop details</h6>
          <div
            className={!editStatus ? "toggle-button clicked" : "toggle-button"}
            onClick={() => setEditStatus(!editStatus)}
          ></div>
        </div>
        <form onSubmit={submitEdit}>
          <div className="row">
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Email
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.email}
              </p>
              <input
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Shop Name
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.shopName}
              </p>
              <input
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setShopName(e.target.value)}
                type="text"
              />
            </div>

            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Phone
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.phone}
              </p>
              <input
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                State
              </small>
              <p className="mt-2">{shopInfoFulfilled.state.state}</p>
              {/* <select
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => {
                  setState(e.target.value);
                  e.target.value !== "" &&
                    dispatch(getDistricts(e.target.value));
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
              </select> */}
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                District
              </small>
              <p className="mt-2">{shopInfoFulfilled.district.district}</p>
              {/* <select
                disabled={state ? false : true}
                className={`${!editStatus ? "d-block" : "d-none"}`}
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
              </select> */}
            </div>

            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Store Type
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.storeType.store}
              </p>
              <select
                onChange={(e) => setStoreType(e.target.value)}
                className={`${!editStatus ? "d-block" : "d-none"}`}
              >
                <option>Choose your Store</option>
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

            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Place
              </small>
              <p className="mt-2">{shopInfoFulfilled.place}</p>
              {/* <input
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setPlace(e.target.value)}
                type="text"
              /> */}
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Password
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
              </p>
              <input
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                About Shop
              </small>
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.aboutShop}
              </p>
              <textarea
                className={`${!editStatus ? "d-block" : "d-none"}`}
                onChange={(e) => setAboutShop(e.target.value)}
                type="text"
              />
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Logo or Shop Image
              </small>
              <div className={`shopLogo ${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.shopLogo && (
                  <img
                    src={shopInfoFulfilled.shopLogo}
                    alt="logo"
                    width="200"
                    height="auto"
                    className="img-fluid"
                    loading="lazy"
                  />
                )}
              </div>
              <div className={`${!editStatus ? "d-block" : "d-none"} d-flex`}>
                <input
                  type="file"
                  className={`image-upload`}
                  onChange={(e) => setShopLogo(e.target.files[0])}
                />
                {shopLogo && (
                  <img
                    src={URL.createObjectURL(shopLogo)}
                    className="temp-image"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <small
                className={`d-inline-block ${
                  !editStatus && "cover-down-10"
                } label`}
              >
                Shop Banner
              </small>
              <div className={`shopLogo ${!editStatus ? "d-none" : "d-block"}`}>
                {shopInfoFulfilled.shopBanner && (
                  <img
                    src={shopInfoFulfilled.shopBanner}
                    alt="Banner"
                    width="200"
                    height="auto"
                    className="img-fluid"
                    loading="lazy"
                  />
                )}
              </div>
              <div className={`${!editStatus ? "d-block" : "d-none"} d-flex`}>
                <input
                  type="file"
                  className={`image-upload`}
                  onChange={(e) => setShopBanner(e.target.files[0])}
                />
                {shopBanner && (
                  <img
                    src={URL.createObjectURL(shopBanner)}
                    className="temp-image"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </div>
          </div>
          {editStatus != true && (
            <div className="d-flex justify-content-end">
              <button className="mt-3 shadow-sm" type="submit">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  ) : (
    <LoadingWatch />
  );
};

export default EditShopDetailsScreen;

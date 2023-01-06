import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupAsShop,
  selectShop,
  resetValuesShop,
} from "../redux/shop/shopSlice";
import {
  getStoreTypes,
  getStates,
  getDistricts,
  selectMisc,
} from "../redux/misc/miscSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePhone } from "../utilities/validate/validate";
import { toast } from "react-toastify";

const SignupAsShopScreen = () => {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [aboutShop, setAboutShop] = useState("");
  const [storeType, setStoreType] = useState("");
  const [place, setPlace] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [agreenTermsandConditions, setAgreeTermsandCondtions] = useState(false);

  const dispatch = useDispatch();

  const { shopInfoFulfilled, shopInfoRejected } = useSelector(selectShop);
  const {
    storesFulfilled,
    statesFulfilled,
    districtsFulfilled,
    storesRejected,
  } = useSelector(selectMisc);

  let navigate = useNavigate();

  const submitSignup = (e) => {
    e.preventDefault();
    if (
      !shopName ||
      !email ||
      !password ||
      !phone ||
      !state ||
      !district ||
      !storeType ||
      !place ||
      !aboutShop
    ) {
      toast.error("All fields are required!");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please check your email!");
      return false;
    }
    if (!validatePhone(phone)) {
      toast.error("Please check your Phone Number!");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password has to be atleast 8 characters!");
      return false;
    }
    if (!agreenTermsandConditions) {
      toast.error("Read and Agree Terms!");
      return false;
    }
    dispatch(
      signupAsShop({
        shopName,
        email,
        phone,
        state,
        district,
        place,
        password,
        storeType,
        aboutShop,
      })
    );
  };

  useEffect(() => {
    dispatch(getStoreTypes());
    dispatch(getStates());
  }, []);

  useEffect(() => {
    dispatch(resetValuesShop());
    shopInfoFulfilled && navigate(`/${shopInfoFulfilled.shopId}`);
    shopInfoRejected && toast.error(shopInfoRejected);
    storesRejected && toast.error(storesRejected);
  }, [shopInfoFulfilled, shopInfoRejected, navigate, storesRejected]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row my-4">
        <div className="offset-md-3 col-md-6">
          <div className="form-box shadow-sm">
            <h3 className="text-start text-title pb-2">Add Shop</h3>
            <form className="d-flex flex-column" onSubmit={submitSignup}>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-4"
              />

              <input
                type="number"
                min="0"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="mb-4"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <small className="info">
                Password has to be minimum 8 characters
              </small>
              <input
                type="text"
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Shop name"
                className="mb-4"
              />

              <select onChange={(e) => setStoreType(e.target.value)}>
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
              <small className="info small">
                STATE,DISTRICT,PLACE can not be changed in future!
              </small>
              <select
                className="mb-4"
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
              </select>

              <select
                className="mb-4"
                disabled={state ? false : true}
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

              <input
                className="mb-4"
                type="text"
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Place"
              />

              <textarea
                placeholder="About shop..."
                onChange={(e) => setAboutShop(e.target.value)}
                className="mb-4"
              ></textarea>
              <div className="align-items-center d-flex my-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() =>
                    setAgreeTermsandCondtions(!agreenTermsandConditions)
                  }
                />
                <label className="ms-2">
                  I Agree <span className="link">Terms and Conditions</span>
                </label>
              </div>
              <button type="submit" className="shadow-sm w-100">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupAsShopScreen;

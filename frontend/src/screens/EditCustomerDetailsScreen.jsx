import React, { useEffect, useState } from "react";
import {
  selectCustomer,
  resetValuesCustomer,
  editCustomer,
  deleteCustomerAccount,
} from "../redux/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";
import {
  validateEmail,
  validatePhone,
  validatePincode,
} from "../utilities/validate/validate";
import { getStates, getDistricts, selectMisc } from "../redux/misc/miscSlice";
import "./EditCustomerDetailsScreen.scss";
import { toast } from "react-toastify";

const EdictCustomerDetailsScreen = () => {
  const [editStatus, setEditStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setstate] = useState("");
  const [district, setdistrict] = useState("");
  const [place, setplace] = useState("");

  const {
    customerInfoFulfilled,
    customerInfoRejected,
    editCustomerRejected,
    editCustomerPending,
    deleteCustomerRejected,
  } = useSelector(selectCustomer);
  const { statesFulfilled, districtsFulfilled } = useSelector(selectMisc);
  const dispatch = useDispatch();

  const submitEdit = (e) => {
    e.preventDefault();
    if (email && !validateEmail(email)) {
      toast.error("Please check your Email!");
      return false;
    }
    if (phone && !validatePhone(phone)) {
      toast.error("Phone has to be 10 digit number!");
      return false;
    }
    if (password && password.length < 8) {
      toast.error("Password has to be atleast 8 characters!");
      return false;
    }
    if (pincode && !validatePincode(pincode)) {
      toast.error("Pincode has to be 6 digit number!");
      return false;
    }
    if (state && !district) {
      toast.error("Please choose District");
      return false;
    }

    dispatch(
      editCustomer({
        email,
        phone,
        fullname,
        state,
        district,
        place,
        password,
        address,
        pincode,
      })
    );
  };

  const deleteAccount = () => {
    let password = window.prompt(
      "All data will be lost. Are you Sure? Enter password if you are willing to delete"
    );
    password && dispatch(deleteCustomerAccount({ password }));
  };

  useEffect(() => {
    dispatch(getStates());
  }, []);

  useEffect(() => {
    dispatch(resetValuesCustomer());
    customerInfoRejected && toast.error(customerInfoRejected);
    customerInfoFulfilled && setEditStatus(!editStatus);
    editCustomerRejected && toast.error(editCustomerRejected);
    deleteCustomerRejected && toast.error(deleteCustomerRejected);
  }, [
    customerInfoRejected,
    customerInfoFulfilled,
    editCustomerRejected,
    deleteCustomerRejected,
    dispatch,
  ]);

  return !editCustomerPending && customerInfoFulfilled ? (
    <div className="container-fluid edit-customer">
      <form onSubmit={submitEdit}>
        <div className="my-4 d-flex justify-content-between align-items-center">
          <h5 className="me-2">Edit </h5>
          <div
            className={!editStatus ? "toggle-button clicked" : "toggle-button"}
            onClick={() => setEditStatus(!editStatus)}
          ></div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">
              Email Id
            </small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.email}
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              type="text"
            />
          </div>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">Name</small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.fullname}
            </p>
            <input
              onChange={(e) => setFullname(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              type="text"
            />
          </div>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">
              Password
            </small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              type="password"
            />
          </div>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">
              Address
            </small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.address}
            </p>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
            ></textarea>
          </div>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">
              Pincode
            </small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.pincode}
            </p>
            <input
              onChange={(e) => setPincode(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              type="text"
            />
          </div>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">Phone</small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.phone}
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              type="text"
            />
          </div>
          {/* <hr />
          <h3 className="mt-2 text-title">Default Search location</h3>
          <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">State</small>
            {customerInfoFulfilled.state && (
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {customerInfoFulfilled.state.state}
              </p>
            )}
            <select
              className={`${!editStatus ? "d-block" : "d-none"}`}
              onChange={(e) => {
                setstate(e.target.value);
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
          </div> */}
          {/* <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">
              District
            </small>
            {customerInfoFulfilled.district && (
              <p className={`${!editStatus ? "d-none" : "d-block"}`}>
                {customerInfoFulfilled.district.district}
              </p>
            )}
            <select
              disabled={state ? false : true}
              className={`${!editStatus ? "d-block" : "d-none"}`}
              onChange={(e) => {
                setdistrict(e.target.value);
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
          </div> */}
          {/* <div className="col-md-4">
            <small className="d-inline-block cover-down-10 label">Place</small>
            <p className={`${!editStatus ? "d-none" : "d-block"}`}>
              {customerInfoFulfilled.place}
            </p>
            <input
              className={`${!editStatus ? "d-block" : "d-none"}`}
              onChange={(e) => setplace(e.target.value)}
              type="text"
            />
          </div> */}
        </div>
        {editStatus != true && (
          <div className="d-flex justify-content-end">
            <button className="mt-3" type="submit">
              Save
            </button>
          </div>
        )}
      </form>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Delete Account ?</h5>
        <button type="button" className="delete" onClick={deleteAccount}>
          Delete
        </button>
      </div>
    </div>
  ) : (
    <LoadingWatch />
  );
};

export default EdictCustomerDetailsScreen;

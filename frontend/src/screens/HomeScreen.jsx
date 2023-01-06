import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.scss";
import bg1 from "../assets/bg-1.svg";
import line from "../assets/line.svg";
import rockets from "../assets/rockets.svg";
import paperplane from "../assets/paperplane.svg";
import footer from "../assets/footer.svg";
import walls from "../assets/walls.svg";
import { validateEmail } from "../utilities/validate/validate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  selectMisc,
  clearFeedback,
  addFeedback,
} from "../redux/misc/miscSlice";

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [customerName, setCustomerName] = useState("");

  const dispatch = useDispatch();

  const { addFeedbackFulfilled, addFeedbackRejected } = useSelector(selectMisc);

  let navigate = useNavigate();
  const gotoSearch = () => {
    navigate("/search");
  };

  const sendFeedback = (e) => {
    e.preventDefault();
    if (!email || !customerName || !feedback) {
      toast.error("All fields are required!");
      return false;
    }
    if (validateEmail(email) !== true) {
      toast.error("Please check your email!");
      return false;
    }

    dispatch(addFeedback({ customerName, email, feedback }));
  };

  useEffect(() => {
    addFeedbackFulfilled && toast.success(addFeedbackFulfilled.status);
    addFeedbackRejected && toast.error(addFeedbackRejected);
    return () => {
      dispatch(clearFeedback());
    };
  }, [addFeedbackFulfilled, addFeedbackRejected]);

  return (
    <div className="home">
      <section
        className="d-flex align-items-center justify-content-center"
        id="section1"
      >
        <div className="content w-100 pb-5 position-absolute">
          <h1 className="text-center p-4 p-sm-2">
            Tired of Seeking Good Products at resonable price!
          </h1>
          <button
            type="button"
            className="btn-search py-2 px-4 shadow-lg rounded-pill mx-auto d-block mt-5"
            onClick={gotoSearch}
          >
            Search Here
          </button>
        </div>
        <div className="svg-geometric">
          <img src={bg1} id="img1" className="pt-5" />
        </div>
      </section>
      <section
        className="d-flex align-items-center justify-content-center"
        id="section2"
      >
        <div className="svg-line pt-5">
          <img src={line} id="img2" className="pt-5" />
        </div>
        <div className="content w-100 d-flex justify-content-center position-absolute">
          <h3 className="text-center d-flex align-items-center justify-content-center p-5 bubbling">
            Share your <br /> products through <br /> us. <br /> let your
            business <br /> grow
          </h3>
        </div>
      </section>
      <section
        className="d-flex align-items-center justify-content-center"
        id="section3"
      >
        <div className="svg-rockets pt-5">
          <img src={rockets} id="img3" className="pt-5" />
        </div>
        <div className="content w-100 d-flex justify-content-center position-absolute">
          <h2 className="text-center d-inline-block p-5">
            Look around you and think
          </h2>
        </div>
      </section>
      <section
        className="d-flex align-items-center justify-content-center"
        id="section4"
      >
        <div className="svg-paperplane pt-5">
          <img src={paperplane} id="img4" className="pt-5" />
        </div>
        <div className="content w-100 d-flex justify-content-center position-absolute">
          <form className="feedback shadow-sm" onSubmit={sendFeedback}>
            <small className="small label mb-3">Name</small>
            <input
              type="text"
              className="mb-1 mt-2"
              placeholder="Name..."
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <small className="small label mb-3">Your Email?</small>
            <input
              type="email"
              className="mb-1 mt-2"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="small label mb-3">Your feedback?</small>
            <textarea
              placeholder="Tell us about it"
              cols="30"
              rows="10"
              className="mb-3 mt-2"
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <button type="submit" className="d-block ms-auto shadow-sm">
              Send
            </button>
          </form>
        </div>
      </section>
      <footer className="d-flex" id="footer">
        <div className="svg-footer pt-5">
          <img src={footer} id="img5" className="pt-5" />
          <img src={walls} id="img6" className="pt-5" />
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;

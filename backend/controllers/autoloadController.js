import AsyncHandler from "express-async-handler";
import Store from "../models/storeModel.js";
import Country from "../models/countryModel.js";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";

// @desc Load stores
// @route GET /api/autoload/storeTypes
// @access public
const getStoreTypes = AsyncHandler(async (req, res) => {
  const stores = await Store.find({}).select("store");
  if (stores) {
    res.status(200).json(stores);
  } else {
    res.status(400);
    throw new Error("No Store Types are available currently !");
  }
});

// @desc Load States beased on country
// @route GET /api/autoload/states
// @access public
const getStates = AsyncHandler(async (req, res) => {
  const states = await State.find({}).select("_id state");
  if (states) {
    res.status(200).json(states);
  } else {
    res.status(400);
    throw new Error("No states are available currently!");
  }
});

// @desc Load Districts beased on state
// @route GET /api/autoload/districts/:id
// @access public
const getDistricts = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const districts = await District.find({ state: id }).select("_id district");

  if (districts) {
    res.status(200).json(districts);
  } else {
    res.status(400);
    throw new Error("No districts are available currently!");
  }
});

export { getStoreTypes, getStates, getDistricts };

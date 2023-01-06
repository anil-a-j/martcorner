import dotenv from "dotenv";
// import districts from "./data/districts.js";
// import District from "./models/districtModel.js";
// import states from "./data/states.js";
// import State from "./models/stateModel.js";
// import countries from "./data/countries.js";
// import Country from "./models/countryModel.js";
import Store from "./models/storeModel.js";
import stores from "./data/stores.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await district.deleteMany();
    // await district.insertMany(districts);
    // await state.deleteMany();
    // await state.insertMany(states);
    // await country.deleteMany();
    // await country.insertMany(countries);
    await Store.deleteMany();
    await Store.insertMany(stores);

    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();

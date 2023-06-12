import dotenv from "dotenv";
import districts from "./data/districts.js";
import District from "./models/districtModel.js";
// import states from "./data/states.js";
// import State from "./models/stateModel.js";
// import countries from "./data/countries.js";
// import Country from "./models/countryModel.js";
// import Store from "./models/storeModel.js";
// import stores from "./data/stores.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await District.deleteMany();
    await District.insertMany(districts);
    // await State.deleteMany();
    // await State.insertMany(states);
    // await Country.deleteMany();
    // await Country.insertMany(countries);
    // await Store.deleteMany();
    // await Store.insertMany(stores);

    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();

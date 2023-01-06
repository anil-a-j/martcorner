import e from "express";
import AsyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import District from "../models/districtModel.js";
import State from "../models/stateModel.js";
import { refreshToken } from "../utils/generateToken.js";

// @desc Signup a new customer
// @route POST /api/customer/signup
// @access public
const signupAsCustomer = AsyncHandler(async (req, res) => {
  const { email, password, fullname } = req.body;

  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(406);
    throw new Error("Customer already exists!");
  }

  const customer = await Customer.create({
    email,
    password,
    fullname,
  });

  if (customer) {
    res
      .cookie("rf", refreshToken(customer.id), {
        httpsOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(201)
      .json({
        id: customer.id,
        email: customer.email,
        fullname: customer.fullname,
      });
  } else {
    res.status(400);
    throw new Error("Invalid customer data");
  }
});

// @desc Login a customer
// @route POST /api/customer/login
// @access public
const loginAsCustomer = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let customer = await Customer.findOne({ email: email });

  if (customer && (await customer.matchPassword(password))) {
    res
      .cookie("rf", refreshToken(customer.id), {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(200)
      .json({
        id: customer.id,
        email: customer.email,
        fullname: customer.fullname,
        email: customer.email,
        phone: customer.phone,
        fullname: customer.fullname,
        place: customer.place,
        address: customer.address,
        pincode: customer.pincode,
      });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// @desc update customer details
// @route PUT /api/customer/editcustomer
// @access private
const updateCustomer = AsyncHandler(async (req, res) => {
  const {
    email,
    phone,
    fullname,
    state,
    district,
    place,
    password,
    address,
    pincode,
  } = req.body;

  const customerExists = await Customer.findById(req.customer._id);

  const emailExists = await Customer.findOne({ email: email });

  if (emailExists) {
    res.status(406);
    throw new Error("That email already in use!");
  }

  if (customerExists) {
    customerExists.email = email || customerExists.email;
    customerExists.phone = phone || customerExists.phone;
    customerExists.fullname = fullname || customerExists.fullname;
    customerExists.state = state || customerExists.state;
    customerExists.district = district || customerExists.district;
    customerExists.place = place || customerExists.place;
    customerExists.address = address || customerExists.address;
    customerExists.pincode = pincode || customerExists.pincode;
    if (password.trim() !== "") {
      customerExists.password = password;
    }

    const updatedCustomer = await customerExists.save();

    if (updatedCustomer) {
      email;
    }

    if (updatedCustomer) {
      let stateName = await State.findById(updatedCustomer.state).select(
        "state"
      );
      let districtName = await District.findById(
        updatedCustomer.district
      ).select("district");
      res.json({
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        fullname: updatedCustomer.fullname,
        state: stateName ? stateName : "",
        district: districtName ? districtName : "",
        place: updatedCustomer.place,
        address: updatedCustomer.address,
        pincode: updatedCustomer.pincode,
      });
    } else {
      res.status(406);
      throw new Error("Data is not valid!");
    }
  } else {
    res.status(404);
    throw new Error("Invalid Data");
  }
});

// @desc remove customer data due to account deletion
// @route POST /api/customer/delete
// @access private
const deleteCustomer = AsyncHandler(async (req, res) => {
  const { password } = req.body;
  const customer = await Customer.findById(req.customer._id);

  if (customer && (await customer.matchPassword(password))) {
    await customer.remove();
    res.json({ status: "Accout has been deleted!" });
  } else {
    res.status(404);
    throw new Error("Invalid Data!");
  }
});

export { signupAsCustomer, loginAsCustomer, updateCustomer, deleteCustomer };

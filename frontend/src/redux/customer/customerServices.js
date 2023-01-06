import {
  reduceSize,
  reduceSizeBanner,
} from "../commonServices/browserImageCompression";
import getAccessKey from "../commonServices/getAccessKey";

export const signupAsCustomerService = async (data) => {
  const api = await fetch("/api/customer/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("customerInfo", JSON.stringify(response));
  return response;
};

export const loginAsCustomerService = async (data) => {
  const api = await fetch("/api/customer/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();

  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("customerInfo", JSON.stringify(response));
  return response;
};

export const logoutAsCustomerService = async () => {
  const api = await fetch("/api/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (api.status !== 200) {
    throw new Error("Logout service temporarily unavailable!");
  }
  localStorage.removeItem("customerInfo");
  return true;
};

// @desc update customer data
export const editCustomerService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch("/api/customer/editcustomer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerCustomer ${access}`,
    },
    body: JSON.stringify(data),
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("customerInfo", JSON.stringify(response));
  return response;
};

// @desc delete customer account
export const deleteCustomerAccountService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch("/api/customer/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerCustomer ${access}`,
    },
    body: JSON.stringify(data),
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.removeItem("customerInfo");
  return true;
};

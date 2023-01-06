import {
  reduceSize,
  reduceSizeBanner,
} from "../commonServices/browserImageCompression";
import getAccessKey from "../commonServices/getAccessKey";

export const signupAsShopService = async (data) => {
  const api = await fetch("/api/shop/signup", {
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
  localStorage.setItem("shopInfo", JSON.stringify(response));
  return response;
};

export const loginAsShopService = async (data) => {
  const api = await fetch("/api/shop/login", {
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
  localStorage.setItem("shopInfo", JSON.stringify(response));
  return response;
};

export const logoutAsShopService = async () => {
  const api = await fetch("/api/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (api.status !== 200) {
    throw new Error("Logout service temporarily unavailable!");
  }
  localStorage.removeItem("shopInfo");
  return true;
};

// @desc update shop data
export const editShopService = async ({
  shopName,
  email,
  phone,
  state,
  district,
  place,
  password,
  storeType,
  aboutShop,
  shopLogo,
  shopBanner,
}) => {
  const access = await getAccessKey();
  const formData = new FormData();
  formData.append("shopLogo", shopLogo ? await reduceSize(shopLogo) : "");
  formData.append(
    "shopBanner",
    shopBanner ? await reduceSizeBanner(shopBanner) : ""
  );
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("state", state);
  formData.append("district", district);
  formData.append("place", place);
  formData.append("password", password);
  formData.append("storeType", storeType);
  formData.append("shopName", shopName);
  formData.append("aboutShop", aboutShop);

  const api = await fetch("/api/shop/editshop", {
    method: "PUT",
    headers: {
      Authorization: `BearerShop ${access}`,
    },
    body: formData,
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.setItem("shopInfo", JSON.stringify(response));
  return response;
};

// @desc delete shop account
export const deleteShopAccountService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch("/api/shop/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerShop ${access}`,
    },
    body: JSON.stringify(data),
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  localStorage.removeItem("shopInfo");
  return true;
};

// get shop page data
export const getShopPageService = async ({ shopId }) => {
  const api = await fetch(`/api/shop/info/${shopId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) throw new Error(response.message);

  return response;
};

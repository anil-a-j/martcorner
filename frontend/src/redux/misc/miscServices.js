import getAccessKey from "../commonServices/getAccessKey";

export const getStoreTypesService = async () => {
  const api = await fetch("/api/autoload/storetypes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }

  return response;
};

export const getStatesService = async () => {
  const api = await fetch(`/api/autoload/states`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const getDistrictsService = async (data) => {
  const api = await fetch(`/api/autoload/districts/${data}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const addFeedbackService = async (data) => {
  const api = await fetch(`/api/review/feedback/add`, {
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
  return response;
};

export const passwordResetService = async (data) => {
  const api = await fetch("/api/utility/pwd/reset", {
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
  return response;
};

export const securityCodeCheckService = async ({ securitycode }) => {
  const api = await fetch(`/api/utility/pwd/check/${securitycode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const createNewPasswordService = async (data) => {
  const api = await fetch("/api/utility/pwd/create", {
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
  return response;
};

export const addToFavoriteShopService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch("/api/utility/favorite/shop/add", {
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
  return response;
};

export const removeFromFavoriteShopService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch("/api/utility/favorite/shop/remove", {
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
  return response;
};

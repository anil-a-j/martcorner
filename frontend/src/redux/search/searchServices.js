import getAccessKey from "../commonServices/getAccessKey";
export const getCustomerSearchService = async ({
  customerId,
  query,
  state,
  district,
  searchType,
  pageSize,
  page,
}) => {
  const api = await fetch(
    `/api/search/customer/products?query=${
      query ? query : null
    }&searchType=${searchType}&district=${district}&state=${state}&pageSize=${pageSize}&page=${page}&customerId=${customerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const getShopSearchProductsService = async ({
  searchQuery,
  pageSize,
  page,
  id,
}) => {
  const access = await getAccessKey();
  const api = await fetch(
    `/api/search/shop/products?query=${searchQuery}&pagesize=${pageSize}&page=${page}&id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BearerShop ${access}`,
      },
    }
  );
  const response = await api.json();
  if (response.message) throw new Error(response.message);
  return response;
};

export const getSearchFavoriteShopService = async ({
  searchQuery,
  pageSize,
  page,
}) => {
  const access = await getAccessKey();
  const api = await fetch(
    `/api/search/favorite/shops?query=${searchQuery}&pagesize=${pageSize}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BearerCustomer ${access}`,
      },
    }
  );
  const response = await api.json();
  if (response.message) throw new Error(response.message);
  return response;
};

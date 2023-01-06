import getAccessKey from "../commonServices/getAccessKey";

// load Reviews
export const getReviewsService = async ({ pageSize, page, id }) => {
  const api = await fetch(
    `/api/review/shop?id=${id}&pagesize=${pageSize}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await api.json();
  if (response.message) throw new Error(response.message);
  return response;
};

// load Reviews
export const addReviewService = async (data) => {
  const access = await getAccessKey();
  const api = await fetch(`/api/review/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerCustomer ${access}`,
    },
    body: JSON.stringify(data),
  });
  const response = await api.json();
  if (response.message) throw new Error(response.message);
  return response;
};

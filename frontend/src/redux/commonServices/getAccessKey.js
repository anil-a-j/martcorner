const getAccessKey = async () => {
  const api = await fetch(`/api/user/getaccesskey`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if (!response.access) {
    localStorage.removeItem("userInfo");
  }
  return response.access;
};

export default getAccessKey;

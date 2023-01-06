import { reduceSize } from "../commonServices/browserImageCompression";
import getAccessKey from "../commonServices/getAccessKey";

export const addProductService = async ({
  productImage1,
  productImage2,
  productName,
  productId,
  productPrice,
  productDiscount,
  productStock,
  productUnit,
  productAvailable,
  productDescription,
}) => {
  const access = await getAccessKey();
  const formData = new FormData();
  formData.append(
    "productImage1",
    productImage1 ? await reduceSize(productImage1) : ""
  );
  formData.append(
    "productImage2",
    productImage2 ? await reduceSize(productImage2) : ""
  );
  formData.append("productName", productName);
  formData.append("productId", productId);
  formData.append("productPrice", productPrice);
  formData.append("productDiscount", productDiscount);
  formData.append("productStock", productStock);
  formData.append("productUnit", productUnit);
  formData.append("productAvailable", productAvailable);
  formData.append("productDescription", productDescription);

  const api = await fetch("/api/product/addproduct", {
    method: "POST",
    headers: {
      Authorization: `BearerShop ${access}`,
    },
    body: formData,
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const checkProductIdService = async (id) => {
  const access = await getAccessKey();
  const api = await fetch(`/api/product/checkid/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerShop ${access}`,
    },
  });
  const response = await api.json();

  if (response.message) throw new Error(response.message);

  return response.available;
};

// edit product data
export const editProductService = async ({
  id,
  productName,
  productId,
  productPrice,
  productStock,
  productUnit,
  productDiscount,
  productAvailable,
  productImage1,
  productImage2,
  productDescription,
  deleteImage2,
}) => {
  const access = await getAccessKey();
  const formData = new FormData();
  formData.append(
    "productImage1",
    productImage1 ? await reduceSize(productImage1) : ""
  );
  formData.append(
    "productImage2",
    productImage2 ? await reduceSize(productImage2) : ""
  );
  formData.append("id", id);
  formData.append("productName", productName);
  formData.append("productId", productId);
  formData.append("productPrice", productPrice);
  formData.append("productDiscount", productDiscount);
  formData.append("productStock", productStock);
  formData.append("productUnit", productUnit);
  formData.append("productAvailable", productAvailable);
  formData.append("productDescription", productDescription);
  formData.append("deleteImage2", deleteImage2);

  const api = await fetch("/api/product/editproduct", {
    method: "POST",
    headers: {
      Authorization: `BearerShop ${access}`,
    },
    body: formData,
  });

  const response = await api.json();
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
};

export const deleteProductService = async (id) => {
  const access = await getAccessKey();
  const api = await fetch(`/api/product/delete/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BearerShop ${access}`,
    },
  });
  const response = await api.json();

  if (response.message) throw new Error(response.message);

  return response;
};

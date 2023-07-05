import axios from "axios";

export const loginServices = async ({ email, password }) =>
  await axios.post("/api/auth/login", {
    email,
    password,
  });

export const signupServices = async ({
  firstName,
  lastName,
  email,
  password,
}) =>
  await axios.post("/api/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });

export const getProducts = async () => await axios.get("/api/products");

export const getSingleProductService = (productId) => {
  return axios.get(`/api/products/${productId}`);
};

export const getCartItems = async ({ encodedToken }) =>
  await axios.get("/api/user/cart", {
    headers: {
      authorization: encodedToken,
    },
  });

export const getWishlistItems = async ({ encodedToken }) =>
  await axios.get("/api/user/wishlist", {
    headers: {
      authorization: encodedToken,
    },
  });

export const postCartItem = async ({ product, encodedToken }) =>
  await axios.post(
    "/api/user/cart",
    {
      product,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const postWishlistItem = async ({ product, encodedToken }) =>
  await axios.post(
    "/api/user/wishlist",
    {
      product,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deleteCartItem = async ({ productId, encodedToken }) =>
  await axios.delete(`/api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const deleteWishlistItem = async ({ productId, encodedToken }) =>
  await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const cartItemQuantity = async ({ productId, encodedToken, type }) =>
  await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: { type },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const clearCartItem = async ({ productId, encodedToken }) =>
  await axios.delete(`api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

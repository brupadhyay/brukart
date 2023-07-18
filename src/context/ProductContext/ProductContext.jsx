import { createContext, useContext, useEffect, useReducer } from "react";

import { ProductReducer, initialState } from "../../reducer/index";
import { filteringUserChoice } from "../../utils/filteringUserChoice";
import { useAuth } from "../AuthContext/AuthContext";
import { toastNotification } from "../../utils";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const { token } = useAuth();
  const localStorageUser = JSON.parse(localStorage?.getItem("login"))


  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories");

      const { categories } = await response.json();

      const { status } = response;

      if(status === 200 || status === 201){
        dispatch({
          type: 'SET_CATEGORIES',
          payload: categories
        });
      }

    } catch (error) {
      console.log(error.message);
      toastNotification("ERROR", "Error in retrieving categories!");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const { products } = await response.json();
      const { status } = response;

      if (status === 200) {
        dispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: products,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCartItemsHandler = () => {
    try {
      const cart = localStorageUser?.user.cart;
      dispatch({ type: "ADD_TO_CART", payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  const getWisthlistItemsHandler = () => {
    try {
      const wishlist = localStorageUser?.user.wishlist;
      dispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilters = (filterType, filterValue) => {
    dispatch({
      type: "CHANGE_FILTERS",
      payload: { filterType, filterValue },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: "CLEAR_FILTERS",
      payload: {},
    });
  };

  useEffect(() => {
    fetchProducts();
    getCartItemsHandler();
    getWisthlistItemsHandler();
    getCategories();
  }, [token]);

  const filteredProducts = filteringUserChoice(state);

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        applyFilters,
        filteredProducts,
        fetchProducts,
        clearFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductContext, ProductProvider, useProduct };


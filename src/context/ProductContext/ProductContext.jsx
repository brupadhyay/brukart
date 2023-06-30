import { createContext, useContext, useEffect, useReducer } from "react";

import { ProductReducer, initialState } from "../../reducer/index";
import { filteringUserChoice } from "../../utils/filteringUserChoice";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

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

  const applyFilters = (filterType, filterValue) => {
    dispatch({
      type: "CHANGE_FILTERS",
      payload: { filterType, filterValue },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'CLEAR_FILTERS',
      payload: {}
    })
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = filteringUserChoice(state);

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        applyFilters,
        filteredProducts,
        fetchProducts,
        clearFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

export { ProductProvider, ProductContext };

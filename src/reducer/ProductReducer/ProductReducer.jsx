const initialState = {
  products: [],
  cart: [],
  wishlist: [],
  filters: {
    category: [],
    rating: "",
    priceRange: 200,
    sortBy: "",
    searchValue: "",
  },
};

const ProductReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload
      }

    case "CHANGE_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          category: [],
          rating: "",
          priceRange: 200,
          sortBy: "",
          searchValue: "",
        }
      };

    default:
      break;
  }
};

export { initialState, ProductReducer };

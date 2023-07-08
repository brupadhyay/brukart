import { v4 as uuid } from "uuid"

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
  addressList: [
    {
      id: uuid(),
      name: "Lallan Yadav",
      street: "404, Tehsil Office, Mirzapur, Gyanpur",
      city: "Jaunpur",
      state: "Uttar Pradesh",
      country: "India",
      pincode: "904089",
      mobile: "1234123456"
    },
  ],
  selectedAddress: {}
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

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: action.payload
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

    case "ADD_ADDRESS":
      console.log("add",action.payload)
      
      return {
        ...state,
        addressList: [...state.addressList, action.payload]
      };

    case "UPDATE_ADDRESS":
      const addressId = action.payload.id;

      const updatedAddressList = state.addressList.map(address => address.id === addressId ? {...action.payload} : address);

      return {
        ...state,
        addressList: [...updatedAddressList]
      }

    case "DELETE_ADDRESS":
      return {
        ...state,
        addressList: state.addressList.filter(({ id }) => id !== action.payload)
      };

    case "ORDER_ADDRESS":
      return {
        ...state,
        selectedAddress: action.payload
      };

    default:
      break;
  }
};

export { initialState, ProductReducer };

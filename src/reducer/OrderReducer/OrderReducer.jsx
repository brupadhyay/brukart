const initialOrderState = {
  pathname: "",
  orders: [],
};

const OrderReducer = (orderState, orderAction) => {
  switch (orderAction.type) {
    case "ADD_NEW_ORDER":
      return {
        ...orderState,
        orders: [...orderState.orders, orderAction.payload]
      };

    case "SET_PATHNAME":
      return {
        ...orderState,
        pathname: orderAction.payload
      };
    
    case "RESET_PATHNAME":
      return {
        ...orderState,
        pathname: orderAction.payload
      };

    default:
      return orderState;
  }
};

export { OrderReducer, initialOrderState };

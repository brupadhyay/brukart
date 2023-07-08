const initialOrderState = {
  orders: [],
};

const OrderReducer = (orderState, orderAction) => {
  switch (orderAction.type) {
    case "ADD_NEW_ORDER":
      return {
        ...orderState,
        orders: [...orderState.orders, orderAction.payload]
      };

    default:
      return orderState;
  }
};

export { OrderReducer, initialOrderState };

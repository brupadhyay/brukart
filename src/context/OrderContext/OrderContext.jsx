import { createContext, useContext, useReducer } from "react";
import { initialOrderState, OrderReducer } from "../../reducer/index";

const OrderContext = createContext({
  orderState: {},
  orderDispatch: () => {},
});

const OrderProvider = ({ children }) => {
  const [orderState, orderDispatch] = useReducer(
    OrderReducer,
    initialOrderState
  );

  return (
    <OrderContext.Provider value={{ orderState, orderDispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { OrderProvider, OrderContext, useOrder };
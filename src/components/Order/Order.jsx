import { Link } from "react-router-dom";
import { useOrder } from "../../context";
import styles from "./Order.module.css"
import { OrderCard } from "../OrderCard/OrderCard";

const Order = () => {
  const { orderState } = useOrder();

  return (
    <div className={styles.orderWrapper}>
      {orderState.orders.length > 0 ? (
        orderState.orders.map((order) => (
            <OrderCard order={order} />
        ))
      ) : (
        <>
          <p className={styles.emptyOrder}>
            There are no recent orders to show! <br /> Buy something to make us
            happy
          </p>
          <Link to="/products" className={`${styles.addNewBtn} button btn-solid-primary`}>
            Start Shopping Now
          </Link>
        </>
      )}
    </div>
  );
};

export { Order };

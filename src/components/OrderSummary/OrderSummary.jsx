import { useState } from "react";
import { useAuth, useProduct } from "../../context";
import { getCartPrice } from "../../utils";
import styles from "./OrderSummary.module.css";
import { useEffect } from "react";
import { AddressCard } from "../AddressCard/AddressCard";

const OrderSummary = ({ setSteps }) => {
  const { state, dispatch } = useProduct();

  const [cartPriceDetails, setCartPriceDetails] = useState({});

  useEffect(() => {
    setCartPriceDetails(getCartPrice(state.cart));
  }, []);

  return (
    <section className={styles.body}>
      <h5 className={styles.orderSummary}>Order Summary</h5>
      <div className={styles.productsWrapper}>
        {state.cart.map((item) => (
          <div className={styles.productCard} key={item._id}>
            <p className={styles.productTitle}>{item.title}</p>
            <div className={styles.priceQtyWrapper}>
              <p className={styles.priceQty}>Qty: {item.qty}</p>
              <p className={styles.priceQty}>
                Final Price: $
                {(item.qty * (item.price * (1 - item.discount / 100))).toFixed(
                  2
                )}
              </p>
            </div>
          </div>
        ))}

        <div className={styles.productCard}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.tableData}>Total Items</td>
                <td className={styles.tableData}>
                  {cartPriceDetails.totalItems}
                </td>
              </tr>
              <tr>
                <td className={styles.tableData}>Total Price</td>
                <td className={styles.tableData}>
                  ${cartPriceDetails.totalPrice}
                </td>
              </tr>
              <tr>
                <td className={styles.tableData}>Total Discount</td>
                <td className={styles.tableData}>
                  ${cartPriceDetails.totalDiscount}
                </td>
              </tr>
              <tr>
                <td className={styles.tableData}>Delivery Charges</td>
                <td className={styles.tableData}>
                  ${cartPriceDetails.deliveryCharges}
                </td>
              </tr>
              <tr>
                <td className={styles.tableData}>Total Amount to pay</td>
                <td className={styles.tableData}>
                  ${cartPriceDetails.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
          <small className={styles.discountNote}>
           You will save $
            {cartPriceDetails.totalDiscount}{" "}
            on this order
          </small>
        </div>
        <div className={`${styles.productCard} ${styles.addressCard}`}>
          <small className={styles.sectionHeading}>
            Your order will be delivered here!
          </small>
          <AddressCard address={state.selectedAddress} />
        </div>
      </div>
      <div className={styles.btnsWrapper}>
        <button
          className="button btn-solid-primary"
          onClick={() => setSteps((prev) => prev - 1)}
        >
          Back
        </button>
        <button className="button btn-solid-primary">Place Order</button>
      </div>
    </section>
  );
};

export { OrderSummary };

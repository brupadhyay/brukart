import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useAuth, useOrder, useProduct } from "../../context";
import { getCartPrice, toastNotification } from "../../utils";
import { Popper, loadScript } from "../../utils/index";
import { AddressCard } from "../AddressCard/AddressCard";
import styles from "./OrderSummary.module.css";
import { clearCartService } from "../../services/services";
import { useNavigate } from "react-router";

const OrderSummary = ({ setSteps }) => {
  const { state, dispatch } = useProduct();
  const { user, token } = useAuth();
  const { orderState, orderDispatch } = useOrder();

  const [cartPriceDetails, setCartPriceDetails] = useState({});
  const navigate = useNavigate();

  const displayRazorpay = async () => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      toastNotification(
        "ERROR",
        "Razorpay SDK failed to load, check your connection"
      );
      return;
    }

    const options = {
      key: "rzp_test_avK74t1UrzXkh7",
      amount: cartPriceDetails.totalAmount * 100 * 82,
      currency: "INR",
      name: "BRUKart",
      description: "Thank you for shopping with us!",
      image:
        "https://res.cloudinary.com/dmlhtqirp/image/upload/v1688840895/BRUKart/razorpay-image.png",
      handler: function (response) {
        toastNotification("SUCCESS", "Order Placed succesfull");
        navigate("/profile");
        Popper();
        clearCartService(token);
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        orderDispatch({
          type: "ADD_NEW_ORDER",
          payload: {
            id: uuid(),
            date: new Date(),
            items: state.cart,
            priceDetails: cartPriceDetails,
            address: state.selectedAddress,
          },
        });
      },
      prefill: {
        name: user.firstName,
        email: user.email,
        contact: "4041234123",
      },
      theme: {
        color: "#23A6F0",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
            You will save ${cartPriceDetails.totalDiscount} on this order
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
        <button
          onClick={() => displayRazorpay()}
          className="button btn-solid-primary"
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export { OrderSummary };

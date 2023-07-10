import { useState } from "react";
import { useProduct } from "../../context";
import { getCartPrice } from "../../utils";

import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./PriceDetails.module.css";

const PriceDetails = () => {
  const { state } = useProduct();
  const [cartPrice, setCartPrice] = useState({});

  useEffect(() => {
    setCartPrice(getCartPrice(state?.cart));
  }, [state?.cart]);

  return (
    <div className={styles.card}>
      <div className="card__title">
        <h5 className={styles.cardTitleValue}>Price Details</h5>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.priceDesc}>
          <p>Price ({cartPrice.totalItems} items)</p>
          <p className={styles.priceDetail}>${cartPrice.totalPrice}</p>
        </div>
        <div className={styles.priceDesc}>
          <p>Discount</p>
          <p className={styles.priceDetail}>-${cartPrice.totalDiscount}</p>
        </div>
        <div className={styles.priceDesc}>
          <p>Delivery Charges</p>
          <p className={styles.priceDetail}>${cartPrice.deliveryCharges}</p>
        </div>
        <div className={styles.totalAmount}>
          <p>TOTAL AMOUNT</p>
          <p className={styles.priceDetail}>${cartPrice.totalAmount}</p>
        </div>
        <div className={styles.priceDesc}>
          <p className={styles.totalCaption}>
            You will save ${cartPrice.totalDiscount} on this order
          </p>
          <button className={styles.applyCouponsBtn}>
            Apply Coupons
          </button>
        </div>
      </div>
      <Link
        to="/checkout"
        className={styles.placeOrderBtn}
      >
        Checkout - ${cartPrice.totalAmount}
      </Link>
    </div>
  );
};

export { PriceDetails };

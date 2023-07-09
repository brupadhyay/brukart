import { Link } from "react-router-dom";

import { HorizontalCard } from "../../components";
import { PriceDetails } from "../../components/PriceDetails/PriceDetails";
import { useAuth, useProduct } from "../../context";
import styles from "./Cart.module.css";

const Cart = () => {
  const { state } = useProduct();
  const { user } = useAuth();

  return (
    <div className={styles.mainBody}>
      <div className={styles.productsHeading}>
        <h5 className="h-5">
          My Cart
          {state.cart.length !== 0 && <span>({state.cart.length})</span>}
        </h5>
      </div>
      <div className={styles.productsAndPrice}>
        <section className={styles.myProducts}>
          {state.cart.length === 0 && (
            <div className={styles.emptyCartMsgWrapper}>
              <img
                src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1688729257/BRUKart/empty_cart.gif"
                loading="lazy"
                alt="empty-cart"
                width="40%"
              />
              <p className={styles.emptyCartMsg}>
                Your Cart is Empty! <br /> Make something that will
                make us pleased.
              </p>
              <Link to="/products" className={`button ${styles.shopnowButton}`}>
                Start Shopping Now
              </Link>
            </div>
          )}
          {user &&
              state.cart.map((game) => (
                <HorizontalCard key={game._id} game={game} />
              ))}
        </section>

        {state.cart.length !== 0 && (
            <aside className={styles.priceDetails}>
              <PriceDetails />
            </aside>
          )}
      </div>
    </div>
  );
};

export { Cart };


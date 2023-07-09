import { Link } from "react-router-dom";

import { HorizontalCard } from "../../components";
import { useAuth, useProduct } from "../../context";
import styles from "../Cart/Cart.module.css";

const Wishlist = () => {
  const { state } = useProduct();
  const { user } = useAuth();

  return (
    <div className={styles.mainBody}>
      <div className={styles.productsHeading}>
        <h5 className="h-5">
          My Wishlist
          {state.wishlist.length !== 0 && (
            <span>({state.wishlist.length})</span>
          )}
        </h5>
      </div>
      <div className={styles.productsAndPrice}>
        <section className={styles.myProducts}>
          {state.wishlist.length === 0 && (
            <div className={styles.emptyCartMsgWrapper}>
              <img
                src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1688729256/BRUKart/empty_wishlist.gif"
                loading="lazy"
                alt="empty-cart"
                width="40%"
              />
              <p className={styles.emptyCartMsg}>
                Your Wishlist is Empty! <br /> Make something that will make us
                pleased.
              </p>
              <Link to="/products" className={`button ${styles.shopnowButton}`}>
                Explore
              </Link>
            </div>
          )}
          {user &&
            state.wishlist.map((game) => (
              <HorizontalCard key={game._id} game={game} />
            ))}
        </section>
      </div>
    </div>
  );
};

export { Wishlist };


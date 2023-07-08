import { Link } from "react-router-dom";
import styles from "./Cart/Cart.module.css";

const Error404 = () => {
  return (
    <div className={styles.mainBody}>
      <div className={styles.productsHeading}>
        <h5 className="h-5">
          Error 404
        </h5>
      </div>
      <div className={styles.emptyCartMsgWrapper}>
        <img
          src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1688847845/BRUKart/404_Error_Page.gif"
          loading="lazy"
          alt="empty-cart"
          width="40%"
        />
        <p className={styles.emptyCartMsg}>
          Something went wrong! <br /> Looks like you're lost
        </p>
        <Link to="/products" className="button btn-solid-primary">
          Explore More
        </Link>
      </div>
    </div>
  );
};

export { Error404 };

import { useState } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";

import { useAuth, useProduct } from "../../context";
import styles from "../../screens/ProductListing/ProductListing.module.css";
import { postCartItem } from "../../services/services";
import { toastNotification } from "../../utils/toaster";

const SingleProductCard = ({ game }) => {
  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const { token } = useAuth();
  const { dispatch } = useProduct();

  const cartHandler = async () => {
    setCartBtnDisabled(true);
    if (token) {
      toastNotification("SUCCESS", `${game.title} successfully added to cart`);
    } else {
      toastNotification("WARNING", "You're not logged-in");
      navigate("/login");
    }

    try {
      const {
        status,
        data: { cart },
      } = await postCartItem({
        product: { ...game, quantity: 1 },
        encodedToken: token,
      });

      if(status === 200 || status === 201){
        setCartBtnDisabled(false);
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        })
      };

    } catch (error) {
        console.log(error.message);
    } finally {
        setCartBtnDisabled(false);
    }
  };

  return (
    <div key={game._id} className={styles.productCard}>
      {game.discount !== "0" && (
        <div className={styles.cardBadge}>
          <BsFillBookmarkFill className={styles.bookmarkBadge} />
          <span className={styles.cardDiscount}>{game.discount}% OFF</span>
        </div>
      )}
      <img
        className={styles.productImage}
        src={game.imageSrc}
        alt="game-banner"
        onClick={() => navigate(`/product/${game._id}`)}
      />
      <div className={styles.cardTitleWrapper}>
        <h2 className={styles.title}>{game.title}</h2>
        <small className={styles.vendor}>{game.vendor}</small>
      </div>
      <p className={styles.cardPrice}>
        ${game.discount !== "0" && <strike>{game.price}</strike>}
        {
          <span className={styles.cardNewPrice}>
            {game.discount === "0"
              ? game.price
              : (
                  game.price -
                  Number.parseFloat(game.price * (game.discount / 100))
                ).toFixed(2)}
          </span>
        }
        /-
      </p>
      <div className={styles.btnsWrapper}>
        <button onClick={cartHandler} className={styles.buyButton}>
          <FaShoppingCart />
          Add to Cart
        </button>
        <button className={`wishlist ${styles.buyButton}`}>
          <AiOutlineHeart
            style={{
              color: "#FF3860",
            }}
          />
        </button>
      </div>

      <div
        className={`${styles.rating} ${
          game.rating > 4.0
            ? styles.ratingSuccess
            : game.rating > 2
            ? styles.ratingWarning
            : styles.ratingDanger
        }`}
      >
        <AiFillStar />
        {game.rating}
      </div>
    </div>
  );
};

export { SingleProductCard };

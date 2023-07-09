import { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from "react-router";

import { useAuth, useProduct } from "../../context";
import styles from "../../screens/ProductListing/ProductListing.module.css";
import {
  deleteWishlistItem,
  postCartItem,
  postWishlistItem,
} from "../../services/services";
import { toastNotification } from "../../utils/index";

const SingleProductCard = ({ game }) => {
  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const [wishlistBtnDisabled, setWishlistBtnDisabled] = useState(false);

  const navigate = useNavigate();

  const { token } = useAuth();
  const { state, dispatch } = useProduct();

  const presentInCart = state?.cart?.find(
    ({ _id: productId }) => productId === game._id
  );

  const presentInWishlist = state?.wishlist?.find(
    ({ _id: productId }) => productId === game._id
  );

  const cartHandler = async () => {
    if (presentInCart) {
      navigate("/cart");
      return;
    }

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
        product: { ...game, qty: 1 },
        encodedToken: token,
      });

      if (status === 200 || status === 201) {
        setCartBtnDisabled(false);
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCartBtnDisabled(false);
    }
  };

  const wishlistHandler = async () => {
    setWishlistBtnDisabled(true);
    if (token) {
      toastNotification("SUCCESS", `${game.title} added to wishlist`);
    } else {
      navigate("/login");
      toastNotification("WARNING", "You're not logged-in");
    }
    try {
      const {
        status,
        data: { wishlist },
      } = await postWishlistItem({
        product: { ...game, wished: true },
        encodedToken: token,
      });

      if (status === 200 || status === 201) {
        dispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setWishlistBtnDisabled(false);
    }
  };

  const removeItemFromWishlist = async (id) => {
    setWishlistBtnDisabled(true);
    if (token) {
      toastNotification("SUCCESS", `${game.title} removed from wishlist`);
    } else {
      toastNotification("WARNING", "You're not logged-in");
    }
    try {
      const {
        status,
        data: { wishlist },
      } = await deleteWishlistItem({
        productId: game._id,
        encodedToken: token,
      });

      console.log("wishlist -> ", wishlist);

      if (status === 200 || status === 201) {
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: wishlist,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWishlistBtnDisabled(false);
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
        <button
          onClick={cartHandler}
          disabled={cartBtnDisabled}
          className={`{ ${presentInCart && styles.gotocartBtn} ${
            styles.buyButton
          } }`}
        >
          {presentInCart ? (
            <>
              <TbTruckDelivery />
              Go to Cart
            </>
          ) : (
            <>
              <FaShoppingCart />
              Add to Cart
            </>
          )}
        </button>
        <button
          className={`{ ${styles.wishlist} ${styles.buyButton} }`}
          onClick={presentInWishlist ? removeItemFromWishlist : wishlistHandler}
          disabled={wishlistBtnDisabled}
        >
          {presentInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
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


import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./HorizontalCard.module.css";
import { cartItemQuantity, clearCartItem, deleteWishlistItem, postWishlistItem } from "../../services/services";
import { useAuth, useProduct } from "../../context";
import { toastNotification } from "../../utils/index";

const HorizontalCard = ({ game }) => {

  const [wishlistBtnDisabled, setWishlistBtnDisabled] = useState(false);

  const { _id, title, qty, price, discount, imageSrc } = game;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { state, dispatch } = useProduct();
  const [isMobile, setIsMobile] = useState(false);

  const presentInWishlist = state.wishlist.find(
    ({ _id: productId }) => productId === game._id
  );

  const removeItemFromCart = async (productId) => {
    toastNotification("INFO", `${title} removed from cart`);
    try {
      const {
        status,
        data: { cart },
      } = await clearCartItem({ productId, encodedToken: token });

      if (status === 200 || status === 201) {
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const quantityHandler = async (type) => {

    switch(type){
      case "increment": toastNotification("INFO", `${game.title}'s quantity increased`);
      break;

      case "decrement": if(game.qty !== 1){
        toastNotification("INFO", `${game.title}'s quantity decreased`);
        break;
      }

      default: break;
    }

    try {
      if (qty === 1 && type === "decrement") {
        removeItemFromCart(_id);
        return;
      }
      const {
        status,
        data: { cart },
      } = await cartItemQuantity({ productId: _id, encodedToken: token, type });

      if (status === 200 || status === 201) {
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      }
    } catch (error) {
      console.log(error);
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
      toastNotification("INFO", `${game.title} removed from wishlist`);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <article className={styles.horizontalCard}>
      {discount !== "0" && (
        <div className={styles.cardBadge}>
          <BsFillBookmarkFill className={styles.bookmarkBadge} />
          <span className={styles.cardDiscount}>{discount}% OFF</span>
        </div>
      )}
      <Link
        to={`/product/${_id}`}
        className={`card__body ${styles.imageWrapper}`}
      >
        <img
          className={styles.myItemImage}
          src={imageSrc}
          loading="lazy"
          alt={title}
        />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardTitleWrapper}>
          <Link to={`/product/${_id}`} className={styles.link}>
            <h5 className={`h-5 ${styles.cardTitle}`}>{title}</h5>
          </Link>
          <p className="bd-5">
            ${discount !== "0" && <strike>{price}</strike>}
            {
              <span className={styles.newPrice}>
                {discount === "0"
                  ? price
                  : (
                      price - Number.parseFloat(price * (discount / 100))
                    ).toFixed(2)}
              </span>
            }
            /-
          </p>
          {pathname === "/cart" && (
            <div className={styles.cardButtonWrapper}>
              <button
                onClick={() => quantityHandler("decrement")}
                className={`button ${styles.quantityButton} `}
              >
                -
              </button>
              <p className={styles.quantityValue}>{qty}</p>
              <button
                onClick={() => quantityHandler("increment")}
                className={`button ${styles.quantityButton} `}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.wishlistBtn}
            onClick={
              presentInWishlist ? removeItemFromWishlist : wishlistHandler
            }
            disabled={wishlistBtnDisabled}
          >
            {presentInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button
            className={` ${isMobile ? styles.trashBtn : styles.removeFromCart}`}
            onClick={() => removeItemFromCart(_id)}
          >
            {isMobile ? <FaTrashAlt /> : "Remove From Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export { HorizontalCard };

import { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

import { TbTruckDelivery } from "react-icons/tb";
import { useAuth, useProduct } from "../../context";
import {
  deleteWishlistItem,
  postCartItem,
  postWishlistItem,
} from "../../services/services";
import { toastNotification } from "../../utils";
import { getSingleProductHandler } from "../../utils/misc/getSingleProductHandler";
import styles from "./SingleProductPage.module.css";

const SingleProductPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const [wishlistBtnDisabled, setWishlistBtnDisabled] = useState(false);

  const navigate = useNavigate();

  const { state, dispatch } = useProduct();
  const { token } = useAuth();

  const presentInCart = state?.cart?.find(
    ({ _id }) => _id.toString() === productId.toString()
  );

  const presentInWishlist = state?.wishlist?.find(
    ({ _id }) => _id.toString() === productId.toString()
  );

  const cartHandler = async () => {
    if (presentInCart) {
      navigate("/cart");
      return;
    }

    setCartBtnDisabled(true);
    if (token) {
      toastNotification("SUCCESS", `${product.title} successfully added to cart`);
    } else {
      toastNotification("WARNING", "You're not logged-in");
      navigate("/login");
    }

    try {
      const {
        status,
        data: { cart },
      } = await postCartItem({
        product: { ...product, qty: 1 },
        encodedToken: token,
      });
      setCartBtnDisabled(false);
      if (status === 200 || status === 201) {
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
      toastNotification("SUCCESS", `${product.title} added to wishlist`);
    } else {
      navigate("/login");
      toastNotification("WARNING", "You're not logged-in");
    }
    try {
      const {
        status,
        data: { wishlist },
      } = await postWishlistItem({
        product: { ...product, wished: true },
        encodedToken: token,
      });
      setWishlistBtnDisabled(false);
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
      toastNotification("SUCCESS", `${product.title} removed from wishlist`);
    } else {
      toastNotification("WARNING", "You're not logged-in");
    }
    try {
      const {
        status,
        data: { wishlist },
      } = await deleteWishlistItem({
        productId: product._id,
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

  useEffect(() => {
    (async () => {
      try {
        const productFromResponse = await getSingleProductHandler(productId);
        setProduct(productFromResponse);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <div id="mainBody">
      <article className={styles.productCard}>
        {product.discount !== "0" && (
          <div className={styles.cardBadge}>
            <BsFillBookmarkFill className={styles.bookmarkBadge} />
            <span className={styles.cardDiscount}>{product.discount}% OFF</span>
          </div>
        )}
        <div className={styles.imgWrapper}>
          <img
            className={styles.productImage}
            src={product.imageSrc}
            loading="lazy"
          />
        </div>
        <div className={styles.detailsWrapper}>
          <h5 className={styles.title}>{product.title}</h5>
          <small className={styles.vendor}>{product.vendor}</small>
          <div className={styles.categoryWrapper}>
            {product.categoryName &&
              product.categoryName.map((category) => (
                <span key={category} className={styles.category}>
                  {category}
                </span>
              ))}
          </div>
          <p className={styles.description}>{product.desc}</p>
          <div className={styles.ratingAndPriceWrapper}>
            <p className={styles.cardPrice}>
              ${product.discount !== "0" && <strike>{product.price}</strike>}
              {
                <span className={styles.cardNewPrice}>
                  {product.discount === "0"
                    ? product.price
                    : (
                        product.price -
                        Number.parseFloat(
                          product.price * (product.discount / 100)
                        )
                      ).toFixed(2)}
                </span>
              }
              /-
            </p>
            <div className={styles.rating}>
              <AiFillStar />
              {product.rating}
            </div>
          </div>
          <div className={styles.btnsWrapper}>
            <button
              className={`${
                cartBtnDisabled && styles.disabledBtn
              } ${presentInCart && styles.gotocart } button btn-solid-dark ${styles.buyButton}`}
              disabled={cartBtnDisabled}
              onClick={cartHandler}
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
              className={`${wishlistBtnDisabled && styles.disabledBtn} ${
                styles.buyButton
              }`}
              disabled={wishlistBtnDisabled}
              onClick={
                presentInWishlist ? removeItemFromWishlist : wishlistHandler
              }
            >
              {presentInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export { SingleProductPage };


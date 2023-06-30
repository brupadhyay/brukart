import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router";

import { getSingleProductHandler } from "../../utils/misc/getSingleProductHandler";
import styles from "./SingleProductPage.module.css";

const SingleProductPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState();

  console.log("id-", productId);

  useEffect(() => {
    (async () => {
      try {
        const productFromResponse = await getSingleProductHandler(productId);
        console.log(productFromResponse);
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
              className={`button btn-solid-dark ${styles.buyButton}`}
              // onClick={() => {
              //   if (authState.token) {
              //     setItemAdded(true);
              //     return addToCartHandler(
              //       product,
              //       cartDispatch,
              //       authState.token
              //     );
              //   }
              //   toast.warning("You're not logged in");
              //   return authModalHandler("LOGIN");
              // }}
            >
              <FaShoppingCart />
              Add to cart
            </button>
            <button
              className={styles.buyButton}
              // onClick={() => {
              //   if (authState.token) {
              //     if (!isWishlisted) {
              //       setIsWishlisted(true);
              //       return addToWishlistHandler(
              //         product,
              //         wishlistDispatch,
              //         authState.token
              //       );
              //     } else {
              //       setIsWishlisted(false);
              //       return removeFromWishlistHandler(
              //         product,
              //         wishlistDispatch,
              //         authState.token
              //       );
              //     }
              //   }
              //   toast.warning("You're not logged in");
              //   return authModalHandler("LOGIN");
              // }}
            >
              <AiOutlineHeart style={{
                color: "#FF3860"
              }} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export { SingleProductPage };

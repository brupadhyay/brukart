import { FaShoppingCart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./ProductListing.module.css";
import { Filters } from "../../components/Filters/Filters";
import { NavLink } from "react-router-dom";

const ProductListing = () => {
  const { filteredProducts } = useProduct();

  return (
    <div className={styles.productPage}>
      <Filters />

      <div>
        <span>Featured Games</span>
        <span>{`(showing ${filteredProducts.length} products)`}</span>
        <div className={styles.productsContainer}>
          {filteredProducts.map((game) => (
            <NavLink
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to={`/product/${game._id}`}
            >
              <div key={game._id} className={styles.productCard}>
                <img
                  className={styles.productImage}
                  src={game.imageSrc}
                  alt="game-banner"
                />
                <div className={styles.title}>{game.title}</div>
                <p>{game.vendor}</p>
                <div>
                  <span>
                    $<del>{game.price}</del>
                  </span>
                  <span>
                    {(
                        game.price -
                        Number.parseFloat(
                          game.price * (game.discount / 100)
                        )
                      ).toFixed(2)}
                  </span>
                  /-
                </div>
                <button>
                  <span>
                    <FaShoppingCart />
                  </span>
                  Add to Cart
                </button>
                <button className={styles.wishlistButton}>
                  <span className={styles.wishlistButtonSpan}>
                    <BsFillHeartFill />
                  </span>
                </button>
                <div className={styles.rating}>
                  <span
                    style={{
                      padding: "0.125rem 0.25rem",
                      color: "white",
                      backgroundColor:
                        game.rating > 4 ? "lightgreen" : "orange",
                    }}
                  >
                    <AiFillStar />
                    {game.rating}
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProductListing };

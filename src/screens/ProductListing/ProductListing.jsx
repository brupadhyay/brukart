import { NavLink, useNavigate } from "react-router-dom";
import { Filters } from "../../components/Filters/Filters";
import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./ProductListing.module.css";
import { SingleProductCard } from "../../components/SingleProductCard/SingleProductCard";

const ProductListing = () => {
  const { filteredProducts } = useProduct();

  return (
    <div className={styles.productPage}>
      <Filters />

      <div>
        <main className={styles.header}>
          <span>Featured Games</span>
          <span
            className={styles.detailCaption}
          >{`(showing ${filteredProducts.length} products)`}</span>
        </main>
        <div className={styles.productsContainer}>
          {filteredProducts.map((game, index) => (
            <SingleProductCard key={index} game={game} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <h2>
            No products matched your search, dont't fret let's give it another
            shot
          </h2>
        )}
      </div>
    </div>
  );
};

export { ProductListing };

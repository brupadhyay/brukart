import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";

import { Filters } from "../../components/Filters/Filters";
import { SingleProductCard } from "../../components/SingleProductCard/SingleProductCard";
import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./ProductListing.module.css";
import { Loader } from "../../components";


const ProductListing = () => {
  const { filteredProducts } = useProduct();

  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(filteredProducts.length === 0){
      setIsLoading(true);
      const loaderClosingId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(loaderClosingId);
    }    
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

  return (
    <div className={styles.productPage}>
      {isLoading && <Loader />}
      <Filters
        isMobile={isMobile}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
      />

      <button className={styles.toggleBtn} onClick={toggleFilters}>
        <BiFilterAlt />
      </button>

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
          <h2 className={styles.noProducts}>
            No products matched your search, dont't fret let's give it another
            shot
          </h2>
        )}
      </div>
    </div>
  );
};

export { ProductListing };


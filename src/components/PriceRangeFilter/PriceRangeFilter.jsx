import { useState } from "react";
import { useProduct } from "../../context/ProductContext/ProductContext";

import styles from "./PriceRangeFilter.module.css";

const PriceRangeFilter = () => {
  const { state, applyFilters } = useProduct();

  return (
    <>
      <div className={styles.dummyPrices}>
        <span>10</span>
        <span>100</span>
        <span>200</span>
      </div>
      <div className={styles.range}>
        <input
          className={styles.inputRange}
          type="range"
          name="priceRange"
          min={10}
          max={200}
          step={10}
          value={state.filters.priceRange}
          onChange={(e) => applyFilters(e.target.name, e.target.value)}
        />
      </div>
    </>
  );
};

export { PriceRangeFilter };

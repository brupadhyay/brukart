import { useProduct } from "../../context";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import { PriceRangeFilter } from "../PriceRangeFilter/PriceRangeFilter";
import { RatingFilter } from "../RatingFilter/RatingFilter";
import { SortByFilter } from "../SortByFilter/SortByFilter";
import styles from "./Filters.module.css";

const Filters = () => {

  const { state, clearFilters } = useProduct();

  return (
    <aside className={styles.asideBar}>
      <button onClick={clearFilters} className={styles.clearFilter}>Clear Filters</button>

      <h1>Categories</h1>
      <CategoryFilter />
      <h1>Price Range: ${state?.filters?.priceRange}</h1>
      <PriceRangeFilter />
      <h1>Sort By</h1>
      <SortByFilter />
      <h1>Rating</h1>
      <RatingFilter />
    </aside>
  );
};

export { Filters };


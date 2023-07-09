import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./SortByFilter.module.css";

const SortByFilter = () => {
  const sortby = ["low to high", "high to low"];
  const { state, applyFilters } = useProduct();

  const handleSorting = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    applyFilters(name, value);
  };

  return (
    <>
      {sortby.map((filtertype) => (
        <div key={filtertype}>
          <label className={styles.label} htmlFor={filtertype}>
            <input
              onChange={handleSorting}
              type="radio"
              name="sortBy"
              id={filtertype}
              value={filtertype}
              checked={state.filters.sortBy === filtertype}
            />
            {filtertype}
          </label>
        </div>
      ))}
    </>
  );
};

export { SortByFilter };

import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./RatingFilter.module.css";

const RatingFilter = () => {
  const { state, applyFilters } = useProduct();

  const ratings = [4, 3, 2, 1];

  const handleRatingChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    applyFilters(name, value);
  };

  return (
    <>
      {ratings.map((rating) => (
        <label key={rating} className={styles.label} htmlFor={rating}>
          <input
            onChange={handleRatingChange}
            type="radio"
            name="rating"
            id={rating}
            value={rating}
            checked={Number(state.filters.rating) === rating}
          />
          {`${rating} stars & above`}
        </label>
      ))}
    </>
  );
};

export { RatingFilter };

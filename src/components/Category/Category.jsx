import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./Category.module.css";

const Category = ({ category: { categoryName } }) => {
  const { state, applyFilters } = useProduct();

  const categoryHandler = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    const name = event.target.name;

    let categories = state.filters.category;

    if (isChecked) {
      categories = [...categories, value];
    } else {
      categories = categories.filter((category) => category !== value);
    }
    applyFilters(name, categories);
  };

  return (
    <label className={styles.label} htmlFor={categoryName}>
      <input
        onChange={categoryHandler}
        type="checkbox"
        name="category"
        value={categoryName}
        id={categoryName}
        checked={state.filters.category.includes(categoryName)}
      />
      {categoryName}
    </label>
  );
};

export { Category };

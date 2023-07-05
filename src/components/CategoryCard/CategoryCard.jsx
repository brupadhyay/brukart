import { useNavigate } from "react-router";
import styles from "./CategoryCard.module.css";
import { useProduct } from "../../context";

const CategoryCard = ({ imagesrc, categoryname }) => {
  const navigate = useNavigate();
  const { applyFilters, state } = useProduct();

  const handleCategorySearch = () => {
    applyFilters("category", [categoryname]);
    navigate("/products");
  }

  return (
    <article onClick={handleCategorySearch} className={styles.categorycard}>
      <img className={styles.categoryImage} src={imagesrc} alt="category-img" />
      <p className={styles.categoryname}>{categoryname}</p>
    </article>
  );
};

export { CategoryCard };

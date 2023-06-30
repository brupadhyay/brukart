import { useEffect, useState } from "react";

import { Category } from "../Category/Category";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories");

      const categoriesFromResponse = await response.json();

      const { status } = response;

      if (status === 200) {
        setCategories([...categoriesFromResponse.categories]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.checkbox}>
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
};

export { CategoryFilter };

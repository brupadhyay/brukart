import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { CategoryCard } from "../index";
import styles from "./ShopByCategory.module.css";

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const responseJson = await fetch("/api/categories");
      const { status } = responseJson;
      const { categories } = await responseJson.json();

      if (status === 200 || status === 201) {
        setCategories([...categories]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className={styles.categoryCarousel}>
        <h5>Shop by Category</h5>
        <NavLink className={styles.link} to="/products">
          See All
        </NavLink>
      </div>
      <section className={styles.categorySection}>
        {categories.map(({ _id, categoryName, imageSrc }) => (
          <CategoryCard
            key={_id}
            imagesrc={imageSrc}
            categoryname={categoryName}
          />
        ))}
      </section>
    </>
  );
};

export { ShopByCategory };


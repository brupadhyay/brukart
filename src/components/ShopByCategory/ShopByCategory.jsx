import { NavLink } from "react-router-dom";

import { CategoryCard } from "../index";
import styles from "./ShopByCategory.module.css";
import { useProduct } from "../../context";

const ShopByCategory = () => {
  
  const { state } = useProduct(); 

  return (
    <>
      <div className={styles.categoryCarousel}>
        <h5>Shop by Category</h5>
        <NavLink className={styles.link} to="/products">
          See All
        </NavLink>
      </div>
      <section className={styles.categorySection}>
        {state?.categories?.map(({ _id, categoryName, imageSrc }) => (
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


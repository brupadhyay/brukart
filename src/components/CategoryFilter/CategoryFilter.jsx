import { useEffect, useState } from "react";

import { Category } from "../Category/Category";
import styles from "./CategoryFilter.module.css";
import { useProduct } from "../../context";

const CategoryFilter = () => {
  
  const { state } = useProduct();

  return (
    <div className={styles.checkbox}>
      {state?.categories?.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
};

export { CategoryFilter };

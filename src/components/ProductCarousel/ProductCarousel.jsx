import { useNavigate } from "react-router-dom";
import styles from "./ProductCarousel.module.css";
import { useProduct } from "../../context/ProductContext/ProductContext";
import { useEffect } from "react";

const ProductCarousel = () => {
  const { state, fetchProducts } = useProduct();

  const navigate = useNavigate();

  const fallguys = state?.products?.find(
    ({ title }) => title === "Fall Guys: Ultimate Knockout"
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <figure className={styles.mainCarousel}>
      <img
        className={styles.mainCarouselImage}
        onClick={() => navigate(`/product/${fallguys?._id}`)}
        src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1686415174/BRUKart/fall-guys.png"
        alt="fall-guys"
        loading="lazy"
      />
      <figcaption className={styles.mainCarouselCaption}>
        Fall Guys: Ultimate Knockout
      </figcaption>
    </figure>
  );
};

export { ProductCarousel };

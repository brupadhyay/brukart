import { useNavigate } from "react-router";
import HeroImage from "../../assets/heroImage.svg";

import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.herosection}>
        <div className={styles.herotext}>
          <h1>Unleash your gaming arsenal!</h1>
          <p>
            Where gaming champions unite to shop for excellence. Elevate your
            gaming experience and conquer new horizons with BRUKART – your
            gateway to the world of gaming excellence.
          </p>
          <button
            className={styles.shopnow}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
        <div className={styles.heroImage}>
          <img className={styles.banner} src={HeroImage} alt="hero-banner" />
        </div>
      </div>
    </>
  );
};

export { Hero };

import { Link } from "react-router-dom";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerContent}>
        <article className={styles.footerLeft}>
          <a href="/" className={styles.contribute}>
            Contribute to BRUKart
          </a>
          <div className={styles.footerLeftSociallinks}>
            <a
              loading="lazy"
              href="https://github.com/brupadhyay"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className={styles.icons} />
            </a>

            <a
              loading="lazy"
              href="https://www.linkedin.com/in/bhavesh-upadhyay-486785217/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className={styles.icons} />
            </a>

            <a
              loading="lazy"
              href="https://twitter.com/brupadhyay17"
              target="_blank"
              rel="noreferrer"
            >
              <FiTwitter className={styles.icons} />
            </a>
          </div>
        </article>
        <article className={styles.footerCenter}>
          <Link to="/" className={styles.footerLink}>
            Home
          </Link>
          <Link to="/products" className={styles.footerLink}>
            Products
          </Link>
          <Link to="/products" className={styles.footerLink}>
            Featured
          </Link>
        </article>
        <article className={styles.footerRight}>
          <Link to="/cart" className={styles.footerLink}>
            My Cart
          </Link>
          <Link to="/wishlist" className={styles.footerLink}>
            Wishlist
          </Link>
          <Link to="/profile" className={styles.footerLink}>
            Settings
          </Link>
        </article>
      </section>
      <p className={styles.footerCopyright}>
        Copyright &copy; 2023
        <a href="https://brupadhyay.netlify.app/"> Bhavesh Upadhyay </a>. All
        Rights Reserved
      </p>
    </footer>
  );
};

export { Footer };

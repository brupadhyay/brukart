import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { BsFillHeartFill, BsSearch } from "react-icons/bs";

import styles from "./Navbar.module.css";
import { useProduct } from "../../context/ProductContext/ProductContext";

const Navbar = () => {
  const { applyFilters } = useProduct();

  const handleSearchProducts = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    applyFilters(name, value);
  };

  const getNavStyle = ({ isActive }) => {
    const outputClass = styles.navlinks;
    return isActive ? `${outputClass} ${styles.active}` : `${outputClass}`;
  };

  return (
    <div className={styles.navbar}>
      <NavLink className={styles.mainLink} to="/">
        <img
          className={styles.logo}
          height="100%"
          width="20%"
          src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1688143234/BRUKart/logo-kart.png"
          alt="logo-brukart"
        />
        <span className={styles.nomenclature}>
          BRU<span>KART</span>
        </span>
      </NavLink>

      <div className={styles.searchContainer}>
        <BsSearch className={styles.searchIcon} />
        <input
          className={styles.search}
          onChange={handleSearchProducts}
          type="text"
          name="searchValue"
          id="search"
          placeholder="Search Products"
        />
      </div>

      <div className={styles.navigators}>
        <NavLink className={getNavStyle} to="/products">
          Explore
        </NavLink>
        <NavLink className={getNavStyle} to="/cart">
          <FaShoppingCart />
        </NavLink>
        <NavLink className={getNavStyle} to="/wishlist">
          <BsFillHeartFill />
        </NavLink>
        <NavLink className={getNavStyle} to="/login">
          <FaRegUserCircle />
        </NavLink>
      </div>
    </div>
  );
};

export { Navbar };

import { BsFillHeartFill, BsSearch } from "react-icons/bs";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { useProduct } from "../../context/ProductContext/ProductContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { applyFilters, state } = useProduct();

  const navigate = useNavigate();

  const handleSearchProducts = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(value.trim()){
      navigate("/products");
    }
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
          src="https://res.cloudinary.com/dmlhtqirp/image/upload/v1688201672/BRUKart/logo-kart.png"
          alt="logo-brukart"
        />
        <span className={styles.nomenclature}>
          BRU<span className={styles.product}>KART</span>
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
          value={state.filters.searchValue}
          placeholder="Search Products"
        />
      </div>

      <div className={styles.navigators}>
        <NavLink className={getNavStyle} to="/products">
          Explore
        </NavLink>
        <NavLink className={getNavStyle} to="/cart">
          <FaShoppingCart />
          <span className={styles.cartCount}>{state?.cart?.length > 0 && state?.cart?.length}</span>
        </NavLink>
        <NavLink className={getNavStyle} to="/wishlist">
          <BsFillHeartFill />
          <span className={styles.cartCount}>{state?.wishlist?.length > 0 && state?.wishlist?.length}</span>
        </NavLink>
        <NavLink className={getNavStyle} to="/profile">
          <FaRegUserCircle />
        </NavLink>
      </div>
    </div>
  );
};

export { Navbar };


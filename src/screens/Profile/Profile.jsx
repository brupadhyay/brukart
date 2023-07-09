import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/ScrollToTop/scrollToTop";
import styles from "./Profile.module.css";
import { Address, Order, UserProfile } from "../../components";
import { useOrder } from "../../context";

const Profile = () => {
  const [currTab, setCurrTab] = useState("profile");
  const { orderState } = useOrder();

  const tabChangeHandler = (tabName) => {
    setCurrTab(tabName);
  };

  useEffect(scrollToTop, [currTab]);
  useEffect(() => {
    setCurrTab("orders");
  }, [orderState.orders])

  return (
    <section id="mainBody">
      <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${
            currTab === "profile" && styles.activeNavBtn
          }`}
          onClick={() => tabChangeHandler("profile")}
        >
          Profile
        </button>
        <button
          className={`${styles.navBtn} ${
            currTab === "address" && styles.activeNavBtn
          }`}
          onClick={() => tabChangeHandler("address")}
        >
          My Address
        </button>
        <button
          className={`${styles.navBtn} ${
            currTab === "orders" && styles.activeNavBtn
          }`}
          onClick={() => tabChangeHandler("orders")}
        >
          My Orders
        </button>
      </nav>

      {(() => {
        switch (currTab) {
          case "profile":
            return <UserProfile />;
          case "address":
            return <Address />;
          case "orders":
            return <Order />;
        }
      })()}
    </section>
  );
};

export { Profile };

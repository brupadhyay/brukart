import { useEffect, useState } from "react";

import { Address, Order, UserProfile } from "../../components";
import { useOrder } from "../../context";
import styles from "./Profile.module.css";

const Profile = () => {
  const [currTab, setCurrTab] = useState("profile");
  const { orderState, orderDispatch} = useOrder();


  const tabChangeHandler = (tabName) => {
    setCurrTab(tabName);
  };

  useEffect(() => {
    if(orderState.pathname === "checkout"){
      setCurrTab("orders");
      orderDispatch({
        type: "RESET_PATHNAME",
        payload: ""
      });
    }
  }, [orderState.pathname]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [currTab]);

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


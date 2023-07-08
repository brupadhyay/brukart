import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/ScrollToTop/scrollToTop";
import styles from "./Profile.module.css";
import { Address, UserProfile } from "../../components";

const Profile = () => {
  const [currTab, setCurrTab] = useState("profile");

  const tabChangeHandler = (tabName) => {
    setCurrTab(tabName);
  };

  useEffect(scrollToTop, []);

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
      </nav>

      {(() => {
        switch (currTab) {
          case "profile":
            return <UserProfile />;
          case "address":
            return <Address />;
        }
      })()}
    </section>
  );
};

export { Profile };

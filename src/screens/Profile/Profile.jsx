import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/ScrollToTop/scrollToTop";
import { useAuth } from "../../context";

const Profile = () => {
  const [tab, setTab] = useState("profile");

  const tabHandler = (tabName) => {
    setTab(tabName);
  };

  const { user, logoutUser } = useAuth();

  useEffect(scrollToTop, []);

  return (
    <section id="mainBody">
        <h1>Welcome User</h1>
        <p>Email: {user.email}</p>
        <button onClick={() => logoutUser()}>Logout</button>
      {/* <UserHeader /> */}

      {/* <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${
            tab === "profile" ? styles.activeNavBtn : ""
          }`}
          onClick={() => tabHandler("profile")}
        >
          Profile
        </button>
        <button
          className={`${styles.navBtn} ${
            tab === "address" ? styles.activeNavBtn : ""
          }`}
          onClick={() => tabHandler("address")}
        >
          My Address
        </button>
        <button
          className={`${styles.navBtn} ${
            tab === "order" ? styles.activeNavBtn : ""
          }`}
          onClick={() => tabHandler("order")}
        >
          My Orders
        </button>
        <button
          className={`${styles.navBtn} ${
            tab === "settings" ? styles.activeNavBtn : ""
          }`}
          onClick={() => tabHandler("settings")}
        >
          Settings
        </button>
      </nav> */}

      {/* {(() => {
        switch (tab) {
          case "profile":
            return <UserProfile />;
          case "address":
            return <Address />;
          case "order":
            return <UserOrders />;
          case "settings":
            return <Settings />;
        }
      })()} */}
    </section>
  );
};

export { Profile };
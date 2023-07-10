import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../../../context";
import { toastNotification } from "../../../utils/index";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { token, loginUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  const dummyUser = {
    email: "lallanyadav@gmail.com",
    password: "lallan",
  };

  const submitHandler = (e) => {
    e.preventDefault();

    loginUser(userDetails.email, userDetails.password);
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    setUserDetails({
      email: dummyUser.email,
      password: dummyUser.password,
    });
  };

  useEffect(() => {
    if (token) {
      toastNotification("SUCCESS", "Successfully Logged In!");
      navigate(location.state.from.pathname || "/");
    }
  }, [token]);

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modal} onSubmit={submitHandler}>
        <header className={styles.header}>
          <h1>Login</h1>
        </header>

        <main className={styles.modalbody}>
          <div className={styles.addressInput}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              name="email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
              placeholder="lallanyadav@gmail.com"
              required
            />
          </div>
          <div className={styles.addressInput}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="*******"
              value={userDetails.password}
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
            <button
              className={styles.passwordToggler}
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </main>
        <footer className={styles.footer}>
          <button className={styles.dummyBtn} onClick={guestLoginHandler}>
            Guest Login
          </button>
          <button className={styles.updateBtn} type="submit">
            login
          </button>
          <button
            className={`${styles.outline} ${styles.updateBtn}`}
            onClick={() => navigate("/signup")}
          >
            signup
          </button>
        </footer>
      </form>
    </div>
  );
};

export { Login };


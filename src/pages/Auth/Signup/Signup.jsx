import { useNavigate } from "react-router";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import styles from "./Signup.module.css";
import { useAuth } from "../../../context/index";
import { toastNotification } from "../../../utils";

const Signup = () => {
  const navigate = useNavigate();

  const { signupUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmpassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (userDetails.password !== confirmPassword) {
      toastNotification("ERROR", "Passwords doesn't match")
      return;
    }

    signupUser(
      userDetails.firstName,
      userDetails.lastName,
      userDetails.email,
      userDetails.password
    );

    navigate("/");
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={submitHandler} className={styles.modal}>
        <header className={styles.header}>
          <h1 className="">Signup</h1>
        </header>
        <main className={styles.modalbody}>
          <div className={styles.addressInput}>
            <label className={styles.label}>First Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="lallan"
              value={userDetails.firstName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstName: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.addressInput}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              type="text"
              autoComplete="nope"
              placeholder="yadav"
              value={userDetails.lastName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastName: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.addressInput}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              autoComplete="nope"
              placeholder="lallanyadav@gmail.com"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.addressInput}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type={isPasswordVisible.password ? "text" : "password"}
              id="password"
              placeholder="*********"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              required
            />
            <button
              className={styles.passwordToggler}
              type="button"
              onClick={() =>
                setIsPasswordVisible({
                  ...isPasswordVisible,
                  password: !isPasswordVisible.password,
                })
              }
            >
              {isPasswordVisible.password ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
          <div className={styles.addressInput}>
            <label className={styles.label} htmlFor="confirm-password">
              Confirm Password{" "}
            </label>
            <input
              className={styles.input}
              id="confirm-password"
              type={isPasswordVisible.confirmpassword ? "text" : "password"}
              placeholder="*********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className={styles.passwordToggler}
              type="button"
              onClick={() =>
                setIsPasswordVisible({
                  ...isPasswordVisible,
                  confirmpassword: !isPasswordVisible.confirmpassword,
                })
              }
            >
              {isPasswordVisible.confirmpassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
        </main>
        {showPasswordError && <p>Entered passwords doesn't match</p>}
        <footer className={styles.footer}>
          <button className={styles.updateBtn} type="submit">
            Sign Up
          </button>
          <button
            className={`${styles.outline} ${styles.updateBtn}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </footer>
      </form>
    </div>
  );
};

export { Signup };

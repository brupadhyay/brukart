import { useLocation, useNavigate } from "react-router";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context";
import { toastNotification } from "../../../utils/toaster";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { token, loginUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const dummyUser = {
    email: "lallanyadav@gmail.com",
    password: "lallan",
  };

  const submitHandler = (e) => {
    e.preventDefault();

    loginUser(userDetails.email, userDetails.password);
  };

  const guesLoginHandler = (e) => {
    e.preventDefault();
    setUserDetails({
      email: dummyUser.email,
      password: dummyUser.password
    });
  }

  useEffect(() => {
    if(token) {
      toastNotification("SUCCESS", 'Successfully Logged In!')
      navigate(location?.state?.from.pathname || "/");
    }
  }, [token]);

  return (
    <div className={styles.loginForm}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <h1>Login</h1>
        <main>
          <div className={styles.inputEmail}>
            <label htmlFor="email">Email</label>
            <input
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
          <div className={styles.inputPassword}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              value={userDetails.password}
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>
        </main>
        <footer className={styles.formButtons}>
          <button className={styles.guestButton}
          onClick={guesLoginHandler}>guest login</button>
          <button className={styles.loginButton} type="submit">
            login
          </button>
          <button onClick={() => navigate("/signup")}>signup</button>
        </footer>
      </form>
    </div>
  );
};

export { Login };

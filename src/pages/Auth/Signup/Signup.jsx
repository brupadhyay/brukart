import { useNavigate } from "react-router";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import styles from "./Signup.module.css";
import { useAuth } from "../../../context/index"

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (userDetails.password !== confirmPassword) {
      setShowPasswordError(true);
      return;
    }

    signupUser(
      userDetails.firstName,
      userDetails.lastName,
      userDetails.email,
      userDetails.password
    );

    navigate("/");
  }

  return (
    <div className={styles.loginForm}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className="">
          <h1 className="">Signup</h1>
          <div className={styles.nameContainer}>
            <div className={styles.nameChild}>
              <label>First Name</label>
              <input
                className=""
                type="text"
                placeholder="lallan"
                value={userDetails.firstName}
                onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                required
              />
            </div>

            <div className={styles.nameChild}>
              <label>Last Name</label>
              <input
                type="text"
                autoComplete="nope"
                placeholder="yadav"
                value={userDetails.lastName}
                onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                required
              />
            </div>
          </div>
          <div className={styles.inputField}>
            <label>Email</label>
            <input
              type="email"
              autoComplete="nope"
              placeholder="lallanyadav@gmail.com"
              value={userDetails.email}
              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              required
            />
          </div>
          <div className={styles.passwordToggleParent}>
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="*********"
              value={userDetails.password}
              onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
              required
            />
            <button className={styles.passwordToggler} type="button" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <div className={styles.inputField}>
            <label htmlFor="confirm-password">Confirm Password </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="*********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
          </div>          
          {showPasswordError &&  <p>Entered passwords doesn't match</p> }
          <footer className={styles.formButtons}>
            <button className={styles.signUpButton} type="submit">Sign Up</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </footer>
        </div>
      </form>
    </div>
  );
};

export { Signup };

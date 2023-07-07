import { createContext, useContext, useState } from "react";
import { loginServices, signupServices } from "../../services/services";
import { toastNotification } from "../../utils/index";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

  const localStorageToken = JSON.parse(localStorage.getItem("login"));

  const [token, setToken] = useState(localStorageToken?.token);

  const localStorageUser = JSON.parse(localStorage.getItem("login"));

  const [user, setUser] = useState(localStorageUser?.user);

  const signupUser = async (firstName, lastName, email, password) => {
    try {
      const {
        status,
        data: { createdUser, encodedToken },
      } = await signupServices({
        firstName,
        lastName,
        email,
        password,
      });

      if (status === 201) {
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: encodedToken,
            user: createdUser,
          })
        );
        setUser(createdUser);
        setToken(encodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const {
        status,
        data: { foundUser, encodedToken },
      } = await loginServices({ email, password });

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: encodedToken,
            user: foundUser,
          })
        );
        setUser(foundUser);
        setToken(encodedToken);
      }
    } catch (error) {
      console.log("error is login user helper ", error.message);
    }
  };


  const logoutUser = () => {
    localStorage.removeItem("login");
    setToken(null);
    setUser(null);
    toastNotification("SUCCESS", "Logout Successful!")
  }

  return (
    <AuthContext.Provider
      value={{
        signupUser,
        user,
        token,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuth };

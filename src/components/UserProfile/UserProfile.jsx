import { useAuth, useOrder, useProduct } from "../../context";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { dispatch } = useProduct();
  const { orderDispatch } = useOrder(); 
  const { user, logoutUser } = useAuth();

  const logoutHandler = () => {
    logoutUser();
    dispatch({
      type: 'CLEAR_CART_AND_WISHLIST',
      payload: []
    });
    dispatch({
      type: 'CLEAR_USER_ADDRESS',
      payload: ''
    });
  }

  return (
    <section>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={`${styles.tableData} ${styles.heading}`}>
              Username
            </td>
            <td className={styles.tableData}>
              {user.firstName} {user.lastName}
            </td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={`${styles.tableData} ${styles.heading}`}>Email </td>
            <td className={`email ${styles.tableData}`}>{user.email}</td>
          </tr>
          <tr className={styles.tableRow}>
            <button onClick={() => logoutHandler()} className={styles.logout}>Logout</button>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export { UserProfile };

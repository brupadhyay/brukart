import { useState } from "react";
import { AddressCard, AddressUpdateModal } from "../../components";
import { useProduct } from "../../context";
import styles from "./Address.module.css";

const Address = () => {
  const { state, dispatch } = useProduct();
  const [addressModal, setAddressModal] = useState({
    active: false,
    action: "new",
    address: {},
  });

  const removeAddressHandler = (id) => {
    dispatch({
      type: 'DELETE_ADDRESS',
      payload: id
    });
  };

  return (
    <div className={styles.addressWrapper}>
      {state.addressList.length ? (
        state.addressList.map((address) => (
          <div className={styles.addressCard} key={address.id}>
            <AddressCard address={address} />
            <div className={styles.btnWrapper}>
              <button
                className={styles.update}
                onClick={() =>
                  setAddressModal({
                    active: true,
                    action: "update",
                    address: address,
                  })
                }
              >
                Update
              </button>
              <button
                className={styles.remove}
                onClick={() => removeAddressHandler(address.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.emptyAddress}>You don't have any Address saved!</p>
      )}
      <button
        className={styles.addNewBtn}
        onClick={() =>
          setAddressModal({
            active: true,
            action: "new",
            address: "",
          })
        }
      >
        + Add New Address
      </button>
      {addressModal.active && (
        <>
        <div className={styles.formWrapper}></div>
        <AddressUpdateModal
          setAddressModal={setAddressModal}
          defaultAddress={
            addressModal.action === "update" && addressModal.address
          }
        />
        </>
      )}
    </div>
  );
};

export { Address };


import { useEffect, useState } from "react";
import { AddressCard, AddressUpdateModal } from "../../components";
import { useProduct } from "../../context";
import styles from "./Address.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Address = ({ setSteps, checkout }) => {
  const { state, dispatch } = useProduct();
  const [addressModal, setAddressModal] = useState({
    active: false,
    action: "new",
    address: {},
  });

  const [selectedAddress, setSelectedAddress] = useState(state.selectedAddress);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const removeAddressHandler = (id) => {
    dispatch({
      type: "DELETE_ADDRESS",
      payload: id,
    });
  };

  useEffect(() => {
    dispatch({
      type: "ORDER_ADDRESS",
      payload: selectedAddress,
    });
  }, [selectedAddress]);

  return (
    <div
      className={`${
        pathname === "/checkout"
          ? styles.checkoutWrapper
          : styles.addressWrapper
      }`}
    >
      {pathname === "/checkout" && (
        <div className={styles.addressHeading}>
          <p>Select Address</p>
        </div>
      )}
      {state.addressList.length ? (
        state.addressList.map((address) => (
          <div className={styles.addressCard} key={address.id}>
            {checkout ? (
              <div>
                <label
                  className={styles.selectedAddressCard}
                  htmlFor={address.id}
                >
                  <input
                    type="radio"
                    id={address.id}
                    onChange={() => setSelectedAddress(address)}
                    checked={selectedAddress === address}
                  />
                  <AddressCard address={address} />
                </label>
              </div>
            ) : (
              <AddressCard address={address} />
            )}
            {!checkout && (
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
            )}
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
      {checkout && (
        <div className={styles.btnsWrapper}>
          <button
            onClick={() => navigate("/cart")}
            className="button btn-solid-primary"
          >
            Back
          </button>

          <button
            className={`button btn-solid-primary ${
              Object.keys(selectedAddress).length === 0 && styles.disabledBtn
            }`}
            disabled={Object.keys(selectedAddress).length === 0 && true}
            onClick={() => setSteps((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
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

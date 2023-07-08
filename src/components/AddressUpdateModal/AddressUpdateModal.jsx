import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./AddressUpdateModal.module.css";
import { useProduct } from "../../context";

const dummyAddress = {
  id: uuid(), 
  name: "John Doe",
  street: "404, Christina Ridges, Independence Avenue",
  city: "West Cooper",
  state: "Washington",
  country: "United States",
  pincode: "223131",
  mobile: "4040404040",
};

const AddressUpdateModal = ({ setAddressModal, defaultAddress = "" }) => {

  const [address, setAddress] = useState({
    id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
  });

  const { dispatch } = useProduct();

  const addressUpdateHandler = (event) => {
    event.preventDefault();


    if(defaultAddress.name){
        dispatch({
            type: "UPDATE_ADDRESS",
            payload: address
        });
    } else {
        dispatch({
            type: 'ADD_ADDRESS',
            payload: address
        });
    }
    setAddressModal(false);
  }

  useEffect(() => {
    if (defaultAddress !== "") {
      setAddress(defaultAddress);
    }
  }, []);

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modal} onSubmit={addressUpdateHandler}>
        <header className={styles.header}>
          <h1>Address</h1>
          <button
            className={styles.closeBtn}
            onClick={() => setAddressModal(false)}
          >
            <AiOutlineCloseCircle />
          </button>
        </header>
        <main className={styles.modalbody}>
          <div className="input input__icons input__premium">
            <div className={styles.addressInput}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                value={address.name}
                placeholder="John Doe"
                onChange={(event) =>
                  setAddress({ ...address, name: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>Street</label>
              <input
                className={styles.input}
                type="text"
                value={address.street}
                placeholder="404, Christina Ridges, Independence Avenue"
                onChange={(event) =>
                  setAddress({ ...address, street: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>City</label>
              <input
                className={styles.input}
                type="text"
                value={address.city}
                placeholder="West Cooper"
                onChange={(event) =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>State</label>
              <input
                className={styles.input}
                type="text"
                value={address.state}
                placeholder="Washington"
                onChange={(event) =>
                  setAddress({ ...address, state: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>Country</label>
              <input
                className={styles.input}
                type="text"
                value={address.country}
                placeholder="United States"
                onChange={(event) =>
                  setAddress({ ...address, country: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>Pincode</label>
              <input
                className={styles.input}
                type="text"
                value={address.pincode}
                placeholder="223131"
                onChange={(event) =>
                  setAddress({ ...address, pincode: event.target.value })
                }
              />
            </div>

            <div className={styles.addressInput}>
              <label className={styles.label}>Mobile</label>
              <input
                className={styles.input}
                type="text"
                value={address.mobile}
                placeholder="4040404040"
                onChange={(event) =>
                  setAddress({ ...address, mobile: event.target.value })
                }
              />
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <button
            className={styles.dummyBtn}
            onClick={(event) => {
              event.preventDefault();
              setAddress(dummyAddress);
            }}
          >
            Dummy Address
          </button>
          <input
            className={styles.updateBtn}
            value={defaultAddress.name ? "update address" : "add new address"}
            type="submit"
          />
        </footer>
      </form>
    </div>
  );
};

export { AddressUpdateModal };


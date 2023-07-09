import { useEffect, useState } from "react";

import { Address, OrderSummary } from "../../components";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [steps]);

  return (
    <div className="checkoutPage">
      <div className={styles.heading}>
        <h5>Checkout Page</h5>
      </div>

      {(() => {
        switch (steps) {
          case 1:
            return <Address setSteps={setSteps} checkout />;
          case 2:
            return <OrderSummary  setSteps={setSteps} />;
        }
      })()}
    </div>
  );
};

export { Checkout };

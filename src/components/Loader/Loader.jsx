import React from "react";
import { Oval } from "react-loader-spinner";

import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <>
      <div className={styles.loaderWrapper}></div>
      <Oval
        height={60}
        width={60}
        color="#0390e2"
        wrapperClass={styles.loader}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#23A6F0"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </>
  );
};

export { Loader };

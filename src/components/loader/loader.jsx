import React from "react";
import spinner from "./loader.gif"; // create gif from https://loading.io
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="loader" className={styles.loaderImg} />
    </div>
  );
};

export default Loader;

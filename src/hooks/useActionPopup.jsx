import React, { useState } from "react";
import styles from "../common.module.css";

const useActionPopup = () => {
  const [show, setShow] = useState(false);
  const [actionTitle, setActionTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("actionTitle: ", actionTitle);
    setActionTitle("");
    setShow(false);
  };

  return [
    show ? (
      <div className={`${styles.popupBG} ${!show && styles.hide}`}>
        <form className={styles.popupForm} onSubmit={handleSubmit}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setShow(false);
            }}
          >
            close
          </button>
          <input
            className={styles.textInput}
            type="text"
            name="actionTitle"
            placeholder="Enter the action title"
            value={actionTitle}
            onChange={(e) => {
              setActionTitle(e.target.value);
            }}
          />

          <button
            className={`${styles.btn} ${styles.loginBtn}`}
            type="submit"
            disabled={false}
          >
            Add Action
          </button>
        </form>
      </div>
    ) : null,
    () => setShow(true),
    () => setShow(false),
  ];
};

export default useActionPopup;

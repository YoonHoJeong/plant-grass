import React, { useEffect, useState } from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import useLoader from "./hooks/useLoader";
import dbManager from "./services/dbManager";

let styles = {};

Object.assign(styles, signupCss, commonCss);

const Signup = () => {
  const { signup } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDuplicate = (e) => {
    e.preventDefault();
    dbManager.checkDuplicateEmail(email);
  };
  const handleChange = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
    hideLoader();

    return () => {
      showLoader();
    };
  }, [hideLoader, showLoader]);

  return loader ? (
    loader
  ) : (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={`${styles.containerTitle}`}>
          <h1 className={`${styles.lgFont}`}>Signup to PlantGrass</h1>
          <div className={`${styles.indexText}`}>
            SIGNUP ON THE INTERNAL PLATFORM
          </div>
        </div>

        <form>
          <input
            className={styles.textInput}
            type="text"
            name="displayName"
            placeholder="Username"
          />
          <div
            className={styles.errorMsg}
            name="displayName"
            component="div"
          ></div>
          <section>
            <input
              className={styles.textInput}
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
            />
            <div className={styles.errorMsg} name="email" component="div"></div>
            <button onClick={handleDuplicate}>중복 확인</button>
          </section>

          <input
            className={styles.textInput}
            type="password"
            name="password"
            placeholder="Password"
          />
          <div
            className={styles.errorMsg}
            name="password"
            component="div"
          ></div>

          <div className={`${styles.indexText} ${styles.notification}`}>
            <span>ALREADY HAS ACCOUNT?</span>
            <Link to="/login">LOGIN</Link>
          </div>
          <button
            className={`${styles.btn} ${styles.loginBtn}`}
            type="submit"
            onSubmit={handleSubmit}
            disabled={isSubmitting}
          >
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

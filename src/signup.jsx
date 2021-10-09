import React, { useEffect, useState } from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import useLoader from "./hooks/useLoader";

let styles = {};

Object.assign(styles, signupCss, commonCss);

const Signup = () => {
  const { signup } = useAuth();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormChange = (e) => {
    setValues((cur) => ({ ...cur, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup();
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

        <form className={styles.form}>
          <input
            className={styles.textInput}
            type="text"
            name="displayName"
            placeholder="Username"
            onChange={handleFormChange}
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
              placeholder="Email Address"
              onChange={handleFormChange}
            />
            <div className={styles.errorMsg} name="email" component="div"></div>
          </section>

          <input
            className={styles.textInput}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleFormChange}
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

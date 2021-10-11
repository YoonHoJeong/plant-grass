import React, { useCallback, useEffect, useRef, useState } from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import useLoader from "./hooks/useLoader";

let styles = {};

Object.assign(styles, signupCss, commonCss);

const Signup = () => {
  const auth = useAuth();
  const { signup } = useAuth();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const goToMain = () => {
    history.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    if (auth.user) {
      // 세션에 로그인된 유저가 있는 경우, Main으로 이동
      goToMain();
    }
  }, []);

  const getRef = (key) => {
    switch (key) {
      case "username":
        return usernameRef;
      case "email":
        return emailRef;
      case "password":
        return passwordRef;
      default:
        return null;
    }
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormChange = (e) => {
    setValues((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    // form validation
    // 1. check blank form
    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (value === "") {
        console.log(key, values);
        // getRef(key).current.focus();
      }
    });
    signup(values);
    setIsSubmitting(false);
    goToMain();
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            className={styles.textInput}
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleFormChange}
            required
          />
          <div
            className={styles.errorMsg}
            name="displayName"
            component="div"
          ></div>
          <section>
            <input
              ref={emailRef}
              className={styles.textInput}
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleFormChange}
              required
            />
            <div className={styles.errorMsg} name="email" component="div"></div>
          </section>

          <input
            ref={passwordRef}
            className={styles.textInput}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleFormChange}
            required
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

import React from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useForm from "./hooks/useForm";

let styles = {};

Object.assign(styles, signupCss, commonCss);

const Signup = ({ userAuth }) => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const user = await userAuth.signup(email, password);
    console.log(user);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={`${styles.containerTitle}`}>
          <h1 className={`${styles.lgFont}`}>Signup to PlantGrass</h1>
          <div className={`${styles.indexText}`}>
            SIGNUP ON THE INTERNAL PLATFORM
          </div>
        </div>

        <form className={styles.loginForm} action="">
          <input
            className={styles.textInput}
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            className={styles.textInput}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={`${styles.indexText} ${styles.notification}`}>
            <span>ALREADY HAS ACCOUNT?</span>
            <a href="">LOGIN</a>
          </div>
          <button
            className={`${styles.btn} ${styles.loginBtn}`}
            onClick={handleSubmit}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

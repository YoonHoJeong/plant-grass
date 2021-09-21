import React from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";

let styles = {};

Object.assign(styles, signupCss, commonCss);

const Signup = (props) => {
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
            type="email"
            placeholder="Email Address"
          />
          <input
            className={styles.textInput}
            type="password"
            placeholder="Password"
          />
          <div className={`${styles.indexText} ${styles.notification}`}>
            <span>ALREADY HAS ACCOUNT?</span>
            <a href="">LOGIN</a>
          </div>
          <button className={`${styles.btn} ${styles.loginBtn}`}>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

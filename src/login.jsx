import React from "react";
import loginCss from "./login.module.css";
import commonCss from "./common.module.css";

let styles = {};

Object.assign(styles, loginCss, commonCss);

const Login = (props) => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={`${styles.containerTitle}`}>
          <h1 className={`${styles.lgFont}`}>Login to PlantGrass</h1>
          <div className={`${styles.indexText}`}>
            LOGIN ON THE INTERNAL PLATFORM
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
            <span>NO ACCOUNT?</span>
            <a href="">SIGN UP</a>
          </div>
          <button className={`${styles.btn} ${styles.loginBtn}`}>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect } from "react";
import loginCss from "./login.module.css";
import commonCss from "./common.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useLoader from "./hooks/useLoader";
import * as Yup from "yup";

let styles = {};

Object.assign(styles, loginCss, commonCss);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string().required("Required!"),
});

const Login = (props) => {
  let auth = useAuth();
  const history = useHistory();
  const goToMain = () => {
    history.push({
      pathname: "/",
      // state: { id: userId },
    });
  };

  let [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
    console.log("login.jsx mount");

    const user = auth.user;
    console.log(user);

    if (user !== null && user !== undefined) {
      showLoader();
      goToMain();
    } else {
      hideLoader();
    }

    return () => {
      showLoader();
    };
  }, []);

  return loader ? (
    loader
  ) : (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={`${styles.containerTitle}`}>
          <h1 className={`${styles.lgFont}`}>Login to PlantGrass</h1>
          <div className={`${styles.indexText}`}>
            LOGIN ON THE INTERNAL PLATFORM
          </div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { email, password } = values;
            const user = await auth.signin(email, password);
            console.log("login", user);
            setSubmitting(false);
            goToMain();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className={styles.textInput}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <ErrorMessage name="email" component="div" />

              <Field
                className={styles.textInput}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" />
              <div className={`${styles.indexText} ${styles.notification}`}>
                <span>NO ACCOUNT?</span>
                <Link to="/signup">SIGN UP</Link>
              </div>
              <button
                className={`${styles.btn} ${styles.loginBtn}`}
                type="submit"
                disabled={isSubmitting}
              >
                LOGIN
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

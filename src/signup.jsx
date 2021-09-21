import React from "react";
import signupCss from "./login.module.css";
import commonCss from "./common.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

let styles = {};

const SignupSchema = Yup.object().shape({
  email: Yup.string() //
    .email("Invaild email")
    .required("Required!"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(12, "Too Long!")
    .required("Required!"),
});

Object.assign(styles, signupCss, commonCss);

const Signup = () => {
  const { signup } = useAuth();

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={`${styles.containerTitle}`}>
          <h1 className={`${styles.lgFont}`}>Signup to PlantGrass</h1>
          <div className={`${styles.indexText}`}>
            SIGNUP ON THE INTERNAL PLATFORM
          </div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { email, password } = values;
            const user = await signup(email, password);
            console.log(user);
            setSubmitting(false);
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;

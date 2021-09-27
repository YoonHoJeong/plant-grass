import React, { useState } from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const actionSchema = Yup.object().shape({
  title: Yup.string().required("Required!!"),
});

const useActionPopup = () => {
  const [show, setShow] = useState(false);
  return [
    show ? (
      <Formik
        initialValues={{ title: "" }}
        validationSchema={actionSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { title } = values;
          console.log(title);
          setShow(false);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <div className={`${styles.popupBG} ${!show && styles.hide}`}>
            <Form className={styles.popupForm}>
              <Field
                className={styles.textInput}
                type="text"
                name="actionTitle"
                placeholder="Enter the action title"
              />
              <ErrorMessage
                className={styles.errorMsg}
                name="actionTitle"
                component="div"
              />
              <button
                className={`${styles.btn} ${styles.loginBtn}`}
                type="submit"
                disabled={isSubmitting}
              >
                Add Action
              </button>
            </Form>
          </div>
        )}
      </Formik>
    ) : null,
    () => setShow(true),
    () => setShow(false),
  ];
};
const Dashboard = ({ todos }) => {
  const [popup, showPopup] = useActionPopup();

  const handleClickAction = (e) => {
    showPopup();
  };

  return (
    <div className={styles.dashboard}>
      <button
        className={`${styles.btn} ${styles.addActionBtn}`}
        onClick={handleClickAction}
      >
        Add Action
      </button>
      {popup}
      <ul className={styles.todoCards}>
        <TodoCard />
      </ul>
    </div>
  );
};

export default Dashboard;

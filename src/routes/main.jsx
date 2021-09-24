import React, { useEffect, useState } from "react";

import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";
import MainHeader from "../components/main_header";
import { getDatabase, ref, onValue, set } from "firebase/database";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = (props) => {
  let auth = useAuth();
  let [loader, showLoader, hideLoader] = useLoader();
  const [todos, setTodos] = useState(null);
  const getTodosById = async (uid) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };
  useEffect(() => {
    hideLoader();

    getTodosById(auth.user.uid);

    return () => {
      showLoader();
    };
  }, []);
  return loader ? (
    loader
  ) : (
    <div className={styles.appContainer}>
      <SideBar />
      <main className={styles.appMain}>
        <div className={styles.pageContainer}>
          <MainHeader auth={auth} />
          <div className={styles.dashboard}>
            <button className={`${styles.btn} ${styles.addActionBtn}`}>
              Add Action
            </button>
            <ul className={styles.todoCards}>
              <li className={styles.todoCard}>
                <button className={`${styles.btn} ${styles.closeBtn}`}></button>
                <section>
                  <header className={styles.indexText}>TODO NAME</header>
                  <div className={styles.todoTitle}>
                    <h2 className={styles.lgFont}>Github</h2>
                    <a className={styles.editBtn}>Edit</a>
                  </div>
                </section>
                <section className={styles.records}>
                  <div>
                    <div className={styles.indexText}>RECORDS</div>
                    <ul className={styles.grassContainer}>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>

                      <li></li>
                    </ul>
                  </div>
                  <div className={styles.bestRecord}>
                    <div className={styles.indexText}>BEST RECORD</div>
                    <div className={styles.bestRecordStat}>100 days</div>
                  </div>
                </section>
                <section>
                  <button className={`${styles.btn} ${styles.commitBtn}`}>
                    Commit Today!
                  </button>
                </section>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;

import { style } from "dom-helpers";
import React from "react";
import styles from "./appTest.module.css";

const AppTest = (props) => (
  <div className={styles.appContainer}>
    <ul className={styles.sideBar}>
      <li className="page">main</li>
      <li className="page">home</li>
    </ul>
    <main className={styles.appMain}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <section className={styles.profile}>
            <div className={styles.profileInfo}>
              <div
                className={styles.profileImg}
                style={{ backgroundImage: `url("logo512.png")` }}
              />
              <div clansName={styles.profileDetail}>
                <h2 className={styles.profileName}>Jeong YunHo</h2>
                <ul className={styles.profileStats}>
                  <li className={styles.stat}>
                    <span className={styles.count}>2</span> Todos
                  </li>
                  <li className={styles.stat}>
                    <span className={styles.count}>33</span> TOTAL COMMITS
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.profileMore}>
              <button className={`${styles.btn} ${styles.moreBtn}`}>...</button>
              <button className={`${styles.btn} ${styles.editProfileBtn}`}>
                Edit Profile
              </button>
            </div>
          </section>
          <ul className={styles.tabNavigator}>
            <li className={`${styles.tablink} ${styles.active}`}>Dashboard</li>
            <li className={styles.tablink}>Todo</li>
            <li className={styles.tablink}>Settings</li>
          </ul>
        </header>
        <div className="dashboard">
          <button>Add Action</button>
          <ul>
            <li>
              <section></section>
              <section>
                <div>
                  <div>RECORDS</div>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div>
                  <div>BEST RECORD</div>
                  <div>7 days</div>
                </div>
              </section>
              <section>
                <button>Commit Today!</button>
              </section>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
);

export default AppTest;

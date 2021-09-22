import React from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = (props) => (
  <div className={styles.appContainer}>
    <SideBar />
    <main className={styles.appMain}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <section className={styles.profile}>
            <div className={styles.profileInfo}>
              <div
                className={styles.profileImg}
                style={{ backgroundImage: `url("logo512.png")` }}
              />
              <div className={styles.profileDetail}>
                <h2 className={`${styles.profileName} ${styles.lgFont}`}>
                  Jeong YunHo
                </h2>
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
              <button className={`${styles.btn} ${styles.moreBtn}`}>
                <MoreHorizIcon />
              </button>
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

export default Main;

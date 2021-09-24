import React from "react";
import headerCss from "./main_header.module.css";
import commonCss from "../../common.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

let styles = {};
Object.assign(styles, headerCss, commonCss);

const MainHeader = ({ auth, todos }) => {
  return (
    <header className={styles.header}>
      <section className={styles.profile}>
        <div className={styles.profileInfo}>
          <div
            className={styles.profileImg}
            style={{ backgroundImage: `url("logo512.png")` }}
          />
          <div className={styles.profileDetail}>
            <h2 className={`${styles.profileName} ${styles.lgFont}`}>
              {auth.user.displayName || "unnamed"}
            </h2>
            <ul className={styles.profileStats}>
              <li className={styles.stat}>
                <span className={styles.count}>{todos.length}</span> Todos
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
          <button
            className={`${styles.btn} ${styles.editProfileBtn}`}
            onClick={() => {
              auth.signout();
            }}
          >
            logout
          </button>
        </div>
      </section>
      <ul className={styles.tabNavigator}>
        <li className={`${styles.tablink} ${styles.active}`}>Dashboard</li>
        <li className={styles.tablink}>Todo</li>
        <li className={styles.tablink}>Settings</li>
      </ul>
    </header>
  );
};

export default MainHeader;

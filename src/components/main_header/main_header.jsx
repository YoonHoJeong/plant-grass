import React, { useCallback } from "react";
import headerCss from "./main_header.module.css";
import commonCss from "../../common.module.css";
import { useAuth } from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

let styles = {};
Object.assign(styles, headerCss, commonCss);

const MainHeader = ({ todos }) => {
  const { user, signout } = useAuth();
  const countCommits = useCallback((todos) => {
    let count = 0;

    Object.keys(todos || {}).forEach((todoId) => {
      const commits = todos[todoId].commits || {};
      const commitCount = Object.keys(commits).length;

      count += commitCount;
    });

    return count;
  }, []);

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
              {user?.name || "unnamed"}
            </h2>
            <ul className={styles.profileStats}>
              <li className={styles.stat}>
                <span className={styles.count}>
                  {Object.keys(todos || {}).length}
                </span>
                Todos
              </li>
              <li className={styles.stat}>
                <span className={styles.count}>{countCommits(todos)}</span>
                TOTAL COMMITS
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.profileMore}>
          <Link to={`/settings`}>
            <Button variant="outlined">Edit Profile</Button>
          </Link>

          <Button variant="outlined" onClick={signout}>
            logout
          </Button>
        </div>
      </section>
      <ul className={styles.tabNavigator}>
        <li className={`${styles.tablink} ${styles.active}`}>
          <Link to={`/`}>
            <Typography variant="subtitle2" gutterBottom component="div">
              DASHBOARD
            </Typography>
          </Link>
        </li>
        <li className={styles.tablink}>
          <Link to={`/todo`}>
            <Typography variant="subtitle2" gutterBottom component="div">
              TODO
            </Typography>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;

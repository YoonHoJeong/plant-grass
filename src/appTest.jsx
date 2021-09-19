import React from "react";
import styles from "./appTest.module.css";

const AppTest = (props) => (
  <div className={styles.appContainer}>
    <ul className={styles.sideBar}>
      <li className="page">main</li>
      <li className="page">home</li>
    </ul>
    <main>
      <header>
        <section>
          <div>
            <img src="logo512.png" alt="Profile IMG" />
            <div>
              <h2>Main Name</h2>
              <div>
                <div>
                  <span>2</span> Todos
                </div>
                <div>
                  <span>33</span> TOTAL COMMITS
                </div>
              </div>
            </div>
          </div>
          <div>
            <button>...</button>
            <button>Edit Profile</button>
          </div>
        </section>
        <ul>
          <li>Dashboard</li>
          <li>Todo</li>
          <li>Settings</li>
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
    </main>
  </div>
);

export default AppTest;

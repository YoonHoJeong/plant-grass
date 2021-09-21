import React from "react";
import styles from "./sideBar.module.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

const SideBar = (props) => (
  <ul className={styles.sideBar}>
    <li>
      <ExploreOutlinedIcon fontSize="large" color="primary" />
    </li>
    <li>
      <HomeOutlinedIcon fontSize="large" color="disabled" />
    </li>
  </ul>
);

export default SideBar;

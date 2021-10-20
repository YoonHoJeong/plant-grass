import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./sideBar.module.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
const SideBar = (props) => {
  const [currentPath, setCurrentPath] = useState("/");
  let location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <ul className={styles.sideBar}>
      <li>
        <Link to="/">
          <HomeOutlinedIcon
            fontSize="large"
            color={currentPath === "/" ? "primary" : "disabled"}
          />
        </Link>
      </li>
      <li>
        <Link to="/settings">
          <SettingsIcon
            fontSize="large"
            color={currentPath === "/settings" ? "primary" : "disabled"}
          />
        </Link>
      </li>
    </ul>
  );
};

export default SideBar;

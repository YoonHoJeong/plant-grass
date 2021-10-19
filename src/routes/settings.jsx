import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./settings.module.css";
import { useAuth } from "../hooks/useAuth";

const Settings = (props) => {
  const auth = useAuth();

  console.log(auth.user);

  return (
    <div className={styles.settings}>
      <TextField label="user name" variant="outlined" />

      <TextField label="uid" variant="outlined" defaultValue={auth.user.uid} />
      <Button variant="contained">Update Profile</Button>
    </div>
  );
};

export default Settings;

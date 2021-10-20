import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./settings.module.css";
import { useAuth } from "../hooks/useAuth";
import dbManager from "../services/dbManager";

const Settings = (props) => {
  const auth = useAuth();
  const [values, setValues] = useState(auth.user);

  const handleChange = (e) => {
    setValues((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    await dbManager.updateUserProfile(values.uid, values);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.inputContainer}>
        <TextField
          name="email"
          label="email"
          variant="outlined"
          onChange={handleChange}
          defaultValue={values.email}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          onChange={handleChange}
          defaultValue={values.name}
        />
      </div>
      <Button onClick={handleUpdateProfile} variant="contained">
        Update Profile
      </Button>
    </div>
  );
};

export default Settings;

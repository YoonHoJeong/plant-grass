import React, { useState } from "react";
import Loader from "../components/loader";

const useLoader = () => {
  const [loading, setLoading] = useState(true);
  return [
    loading ? <Loader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
export default useLoader;

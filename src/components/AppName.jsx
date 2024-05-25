import React, { useContext } from "react";
import { NameContext } from "./NameContext";

const AppName = () => {
  const name = useContext(NameContext);
  return (
    <>
      <div className="header">YOUR LIST - {" " + name}</div>
    </>
  );
};

export default AppName;

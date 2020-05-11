import React from "react";
import AnimationSVG from "./loadingBig.svg";

const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <img src={AnimationSVG} style={{ width: "auto" }} alt="loading" />
  </div>
);

export default Loader;

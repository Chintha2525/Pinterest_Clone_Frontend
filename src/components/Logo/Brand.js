import React from "react";
import logo_source from "../../assets/png/logo-no-background.png"
import "./Brand.css"

const Brand = (props) => {
  return (
    <>
      <img
        src={logo_source}
        width="50"
        height="50"
        className={props.className ? props.className : "d-inline-block align-top"}
        alt="Pinterest logo"
      /> <span className="logo">{props.name}</span>
    </>
  );
};

export default Brand;

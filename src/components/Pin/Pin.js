import React, { useContext, useState } from "react";
import PinHeader from "./PinHeader";
import PinFooter from "./PinFooter";
import { AuthContext } from "../../context/AuthContext";

const Pin = (props) => {
  const [hover, setHover] = useState(false);
  const { user } = useContext(AuthContext);

  const width = (window.innerWidth - 40) / 6;
  const r_no = props.style.row_no;

  const style = {
    marginTop:
      r_no === 0
        ? props.style.margin < 4
          ? 80 * props.style.margin + "px"
          : 80 * (6 - props.style.margin) + "px"
        : "None",
    width: width,
  };

  const handleMouseIn = (e) => {
    if (user) {
      const sc = document.getElementById(props.id);
      const height = e.target.getAttribute("height");
      const width = e.target.getAttribute("width");
      sc?.setAttribute("class", "hover");
      sc?.setAttribute("style", `--height:${height}px;--width:${width}px`);
      setHover(true);
    }
  };

  const handleMouseOut = () => {
    if (user) {
      const sc = document.getElementById(props.id);
      sc?.removeAttribute("class");
      setHover(false);
    }
  };

  return (
    <div
      className="image"
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      style={style}
    >
      {hover && <PinHeader pid={props.pid} />}
      <div id={props.id}></div>
      <img src={props.source} alt="Pin" width={width} height="auto" />
      {hover && <PinFooter url={props.url} />}
    </div>
  );
};

export default Pin;

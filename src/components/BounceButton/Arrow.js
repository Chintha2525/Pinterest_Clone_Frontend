import React from "react";
import Icon from "react-icons-kit";
import {ic_expand_more} from 'react-icons-kit/md/ic_expand_more'

const Logo = (props) => (
  <button
    {...props}
    style={{ backgroundColor: "hotpink", borderRadius: "50%", border: "none", zIndex:"1" }}
  >
    <Icon icon={ic_expand_more} size={25 } />
  </button>
);

export default Logo;

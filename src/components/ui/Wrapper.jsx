import React from "react";

import classes from "./Wrapper.module.scss";

const Wrapper = (props) => {
  return <div className={`${classes.wrapper} ${props.wide ? classes.wide : null}`}>{props.children}</div>;
};

export default Wrapper;
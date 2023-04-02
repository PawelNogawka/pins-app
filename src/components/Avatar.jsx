import React from "react";
import { urlFor } from "../lib/client";

import "./Avatar.scss";

const Avatar = ({ src, name }) => {
  return (
    <img className="avatar-user" src={urlFor(src)} alt={name} width="45" />
  );
};

export default Avatar;

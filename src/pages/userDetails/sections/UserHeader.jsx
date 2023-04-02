import React from "react";

import { urlFor } from "../../../lib/client";

import "./UserHeader.scss";

const UserHeader = ({ avatarSrc, heroSrc, name }) => {
  return (
    <div className="user-header">
      <img
        src={urlFor(heroSrc)}
        className="user-header__hero"
        alt="user hero"
      />
      <img
        src={urlFor(avatarSrc)}
        alt={name}
        className="user-header__avatar"
        width={90}
      />
      <h1 className="main-heading main-heading--white user-header__heading">
        {name}
      </h1>
    </div>
  );
};

export default UserHeader;

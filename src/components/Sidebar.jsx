import React from "react";
import { NavLink, Link } from "react-router-dom";
import { urlFor } from "../lib/client";

import { useAuthContext } from "../hooks/useAuthContext";
import { useSanity } from "../hooks/useSanity";

import { TfiClose } from "react-icons/tfi";

import Avatar from "./Avatar";

import "./Sidebar.scss";

const Sidebar = ({ setIsSidebarShow, isSidebarShow }) => {
  const { data, isLoading, error } = useSanity(`*[_type == "category"]
  `);

  const { user } = useAuthContext();

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  const handleLastLinkBlur = () => {
    setIsSidebarShow(false);
  };

  return (
    <div className={`${"sidebar"} ${isSidebarShow && "sidebar--show"}`}>
      <button
        onClick={() => setIsSidebarShow(false)}
        onFocus={() => setIsSidebarShow(true)}
        className="sidebar__close"
      >
        <TfiClose />
      </button>
      {user && (
        <Link to={`uzytkownik/${user._id}`} className="sidebar__user">
          <Avatar src={user.avatar.asset._ref} />
          <span className="sidebar__user-name">{user.name}</span>
        </Link>
      )}
      <NavLink
        to="/"
        onClick={() => setIsSidebarShow(false)}
        onFocus={() => setIsSidebarShow(true)}
        className={({ isActive }) =>
          isActive ? "sidebar__home-link--active" : " sidebar__home-link"
        }
      >
        Home
      </NavLink>
      <h3 className="sidebar__heading">Szukaj poprzez kategorie</h3>
      <ul className="sidebar__nav">
        {data.map((category, index) => (
          <li key={category.name} className="sidebar__nav-item">
            <NavLink
              to={`/kategorie/${category.slug.current}`}
              onClick={() => setIsSidebarShow(false)}
              onFocus={() => setIsSidebarShow(true)}
              onBlur={index === data.length - 1 ? handleLastLinkBlur : null}
              className={({ isActive }) =>
                isActive ? "sidebar__nav-link--active" : " sidebar__nav-link"
              }
            >
              <img
                className="sidebar__nav-img"
                src={urlFor(category.image.asset._ref)}
                alt={category.name}
                width={50}
                height={50}
              />
              <span>{category.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

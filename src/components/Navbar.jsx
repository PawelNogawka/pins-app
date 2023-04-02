import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

import { useAuthContext } from "../hooks/useAuthContext";

import Login from "./Login";
import Logout from "./Logout";
import Input from "./ui/Input";

import { FiMenu } from "react-icons/fi";
import { GrFormAdd } from "react-icons/gr";

import "./Navbar.scss";

const Navbar = ({ setIsSidebarShow }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch, user } = useAuthContext();

  const navigate = useNavigate();

  const clientId =
    "1031137978205-rn6i2pssgeveoeaji7up5qfqesq3270f.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
      });
    }
    gapi.load("client:auth2", start);
  });

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    if (value.length === 0) return navigate("/");
    setSearchTerm(value);
    navigate(`/search/${value}`);
  };

  return (
    <header>
      <nav className="nav">
        <Link to="/" className="header__logo">
          pins
        </Link>
        <Input
          onChange={handleSearchInputChange}
          placeholder="Wyszukaj..."
          type="search"
          name="search"
          id="search"
        />
        <div className="nav__box">
          {user && (
            <Link to="/utworz-pin" className="nav__add-btn">
              <GrFormAdd />
            </Link>
          )}
          {!user && <Login />}
          {user && <Logout dispatch={dispatch} />}
          <button
            onClick={() => setIsSidebarShow((prev) => !prev)}
            className="nav__burger"
          >
            <FiMenu />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

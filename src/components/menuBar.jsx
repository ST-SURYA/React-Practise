import React, { useContext, useState } from "react";
import logo from "../Assests/logo/pngtree-initials-s-logo-is-full-of-colors-with-simple-clean-and-image_319090.jpg";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { authProps } from "../router/Routing";

const MenuBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const getAuthStatus = useContext(authProps);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md bg-light rounded-5 mt-3">
        <div className="container-fluid">
          {/* Toggle button on the left */}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <FiMenu />
          </button>

          {/* Logo centered on the right */}
          <Link className="navbar-brand mx-auto" to="/">
            <img src={logo} alt="" className="logo-image" />
            S-Tech
          </Link>

          {/* Navigation items */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-100 justify-content-end">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/redux">
                  Redux
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reducerHook">
                  Reducer Hook
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contextHook">
                  Context Hook
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/memoHook">
                  Memo Hook
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/table"
                  id="tableDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Table
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="tableDropdown">
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/table/TanStackTable"
                    >
                      TanStack Table
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/table/TanStackGroup"
                    >
                      TanStack Group
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/table/TanStackVirtual"
                    >
                      TanStack Virtualaizer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/table/TanStackQuery"
                    >
                      TanStack Query
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/form"
                  id="formDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Forms
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="formDropdown">
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/form/NormalForm"
                    >
                      Normal Form
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/form/WizardForm"
                    >
                      Wizard Form
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                {/* Log out button */}
                <BiLogOutCircle
                  size={40}
                  onClick={() => {
                    localStorage.setItem("authStatus", "false");
                    getAuthStatus();
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuBar;

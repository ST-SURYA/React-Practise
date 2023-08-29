import React, { useContext, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { authProps } from "../router/Routing";
import { FiMenu } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import logo from "../Assests/logo/pngtree-initials-s-logo-is-full-of-colors-with-simple-clean-and-image_319090.jpg";

const Navbar = () => {
  const [click, setClick] = React.useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => {
    setClick(false);
    setDropdown1(false);
    setDropdown2(false);
  };
  const toggleDropdown1 = () => setDropdown1(!dropdown1);
  const toggleDropdown2 = () => setDropdown2(!dropdown2);
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar text-dark" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link className="navbar-brand mx-auto" to="/">
            <img src={logo} alt="" className="logo-image" />
            S-Tech
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/reducerHook"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Reducer Hook
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contextHook"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Context Hook
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/memoHook"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Memo Hook
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="nav-links nav-dropdown" onClick={toggleDropdown1}>
                Table
                <MdArrowDropDown />
              </div>
              {dropdown1 && (
                <ul className="nav-dropdown-menu">
                  {/* Dropdown 1 options */}
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/table/TanStackTable"
                      activeClassName="active"
                      className="nav-links"
                      onClick={Close}
                    >
                      TanStack Table
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/table/TanStackQuery"
                      activeClassName="active"
                      className="nav-links"
                      onClick={Close}
                    >
                      TanStack Query
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <div className="nav-links nav-dropdown" onClick={toggleDropdown2}>
                Form
                <MdArrowDropDown />
              </div>
              {dropdown2 && (
                <ul className="nav-dropdown-menu">
                  {/* Dropdown 2 options */}
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/form/NormalForm"
                      activeClassName="active"
                      className="nav-links"
                      onClick={Close}
                    >
                      Normal Form
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/form/WizardForm"
                      activeClassName="active"
                      className="nav-links"
                      onClick={Close}
                    >
                      WizardForm
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <FiMenu />
            {/* <i className={click ? "fa fa-times" : "fa fa-bars"}></i> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { PiListDashesBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggle } from "../redux/slices/toggleSlice";
const Sidebar = () => {
  const isOpen = useSelector((state) => state.toggleSlice);
  const dispatch = useDispatch();
  //   const [isOpen, setIsopen] = useState(true);

  const ToggleSidebar = () => {
    dispatch(toggle());
  };
  return (
    <>
      <div className="container-fluid mt-3">
        {!isOpen && (
          <div className="btn btn-success" onClick={ToggleSidebar}>
            <PiListDashesBold />
          </div>
        )}
        <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0">Dashboard</h4>
            <div onClick={ToggleSidebar}>
              <AiOutlineClose size={20} />
            </div>
          </div>
          <div className="sd-body">
            <ul>
              <li>
                <NavLink className="sd-link" to="/">
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink className="sd-link" to="/redux">
                  Redux
                </NavLink>
              </li>
              <li>
                <NavLink className="sd-link" to="/reducerHook">
                  Reducer Hook
                </NavLink>
              </li>
              <li>
                <NavLink className="sd-link" to="/contextHook">
                  Context Hook
                </NavLink>
              </li>
              <li>
                <NavLink className="sd-link" to="/memoHook">
                  Memo Hook
                </NavLink>
              </li>
              <li>
                <div className="sd-link">
                  <div
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#tableMenu"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Table
                    <MdArrowDropDown className="ml-5" size={20} />
                  </div>

                  <div class="collapse" id="tableMenu">
                    <NavLink className="sd-link" to="/table/TanStackTable">
                      TanStack Table
                    </NavLink>
                    <NavLink className="sd-link" to="/table/TanStackGroup">
                      TanStack Group
                    </NavLink>
                    <NavLink className="sd-link" to="/table/TanStackQuery">
                      TanStack Query
                    </NavLink>
                  </div>
                </div>
              </li>
              <li>
                <div class="sd-link">
                  <div
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#formMenu"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Form <MdArrowDropDown className="ml-5" size={20} />
                  </div>

                  <div class="collapse" id="formMenu">
                    <NavLink className="sd-link" to="/form/NormalForm">
                      Normal Form
                    </NavLink>
                    <NavLink className="sd-link" to="/form/WizardForm">
                      Wizard Form
                    </NavLink>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState, useContext, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Todos from "../hooks/Reducer/Todos";
import ParentCmp from "../hooks/contextHook/parentCmp";
import MemoHook from "../hooks/memo/memoHook";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./protectedRoute";
import MenuBar from "../components/menuBar";
import Home from "../pages/Home";
import FormCmp from "../components/fromCmp";
import WizardsForm from "../components/WizardsForm";
import DataTable from "../components/dataTable";
import DataTableQuery from "../components/dataTableQuery";
import ReduxEx from "../pages/reduxEx";
import DataGroupTable from "../components/DataGroupTable";
import DataVirtualizer from "../components/DataVirtualizer";
import DataVirtualizer1 from "../components/DataVirtual1";
import DataTableAll from "../components/DataTableAll";
export const authProps = createContext("");
const Routing = () => {
  const [authStatus, setAuthStatus] = useState(() =>
    JSON.parse(localStorage.getItem("authStatus"))
  );
  const getAuthStatus = () => {
    setAuthStatus(() => JSON.parse(localStorage.getItem("authStatus")));
  };
  console.log(authStatus);
  return (
    <authProps.Provider value={getAuthStatus}>
      <MenuBar />
      {/* <SideBar /> */}
      {/* <Navbar /> */}
      {/* <Sidebar /> */}

      <Routes>
        <Route path="/login" index={true} element={<Login />} />
        <Route path="/" element={<ProtectedRoute isAuth={authStatus} />}>
          <Route index element={<Home />} />
          <Route path="redux" element={<ReduxEx />} />
          <Route path="reducerHook" element={<Todos />} />
          <Route path="contextHook" element={<ParentCmp />} />
          <Route path="memoHook" element={<MemoHook />} />
          <Route path="form">
            <Route path="NormalForm" element={<FormCmp />} />
            <Route path="WizardForm" element={<WizardsForm />} />
          </Route>
          <Route path="table">
            <Route path="TanStackTable" element={<DataTable />} />
            <Route path="TanStackGroup" element={<DataGroupTable />} />
            <Route path="TanStackVirtual" element={<DataVirtualizer1 />} />
            <Route path="TanStackQuery" element={<DataTableQuery />} />
            <Route path="TanStackAll" element={<DataTableAll />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </authProps.Provider>
  );
};
export default Routing;

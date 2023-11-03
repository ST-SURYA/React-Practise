import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/login",
    index: true,
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute isAuth={true} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "redux",
        element: <ReduxEx />,
      },
      {
        path: "reducerHook",
        element: <Todos />,
      },
      {
        path: "contextHook",
        element: <ParentCmp />,
      },
      {
        path: "memoHook",
        element: <MemoHook />,
      },
      {
        path: "form",
        children: [
          {
            path: "NormalForm",
            element: <FormCmp />,
          },
          {
            path: "WizardForm",
            element: <WizardsForm />,
          },
        ],
      },
      {
        path: "table",
        children: [
          {
            path: "TanStackTable",
            element: <DataTable />,
          },
          {
            path: "TanStackQuery",
            element: <DataTableQuery />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

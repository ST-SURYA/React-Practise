import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MenuBar from "./components/menuBar";
import Routing from "./router/Routing";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router/Routing1";

function App() {
  const queryClient = new QueryClient(); // For tan satck query
  return (
    <div className="App">
      {/* For tan satck query */}
      <QueryClientProvider client={queryClient}>
        {/* <RouterProvider router={router}></RouterProvider> */}
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

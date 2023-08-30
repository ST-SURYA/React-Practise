import React from "react";
import Sidebar from "./sideBar";

const HOC = (WrappedComponent) => {
  return function WithSidebar(props) {
    return (
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default HOC;

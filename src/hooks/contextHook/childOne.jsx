import React from "react";
import ChildTwo from "./childTwo";
import ChildThree from "./childThree";

const ChildOne = () => {
  return (
    <div className=" text-center">
      <h4>Direct child</h4>
      <ChildThree>
        <ChildTwo />
      </ChildThree>
    </div>
  );
};

export default ChildOne;

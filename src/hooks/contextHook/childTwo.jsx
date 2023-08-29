import React, { useContext, useEffect, useRef } from "react";
import { contexProps } from "./parentCmp";
import { useSelector } from "react-redux";

const ChildTwo = () => {
  const parentval = useContext(contexProps);
  const count = useSelector((state) => state.counter);
  const contextVal = useSelector((state) => state.contextSlice.value);
  const renCount = useRef(0);
  useEffect(() => {
    renCount.current = renCount.current + 1;
  }, [count]);
  return (
    <div>
      <h4>In-Direct child</h4>
      <h5>{parentval}</h5>
      <h3>Redux context value {contextVal}</h3>
      <h3>Redux value {count}</h3>
      <h3>Render count {renCount.current}</h3>
    </div>
  );
};

export default ChildTwo;

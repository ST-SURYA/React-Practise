import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, sub } from "../redux/slices/counterSlice";
import HOC from "../components/hoc";
const ReduxEx = () => {
  const [credentials, setCredentials] = useState({ value: "", operator: "" });
  const counterValue = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="m-auto mt-3 w-25 card text-center">
      {/* <label className="form-control">
        task <input type="text" id="task" />
      </label> */}
      <h4>{counterValue}</h4>
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Enter the Value"
          onChange={(e) => {
            setCredentials({ ...credentials, value: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Enter the Operator"
          className="form-control"
          onChange={(e) => {
            setCredentials({ ...credentials, operator: e.target.value });
          }}
        />
      </div>
      <button
        className="btn btn-primary m-2"
        onClick={() =>
          dispatch({ type: "counter/custom", payload: credentials })
        }
      >
        custom
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => dispatch({ type: "counter/add", payload: 2 })}
      >
        ADD
      </button>
      <button className="btn btn-primary m-2" onClick={() => dispatch(sub())}>
        SUB
      </button>
    </div>
  );
};

export default HOC(ReduxEx);

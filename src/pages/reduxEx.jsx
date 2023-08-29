import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, sub } from "../redux/slices/counterSlice";
const ReduxEx = () => {
  const counterValue = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="m-auto mt-3 w-25 card text-center">
      {/* <label className="form-control">
        task <input type="text" id="task" />
      </label> */}
      <h4>{counterValue}</h4>
      <button className="btn btn-primary m-2" onClick={() => dispatch(add(1))}>
        ADD
      </button>
      <button className="btn btn-primary m-2" onClick={() => dispatch(sub())}>
        SUB
      </button>
    </div>
  );
};

export default ReduxEx;

import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import useLocalStorage from "../custom Hook/LocalStorage";

function MemoHook() {
  const [num1, setNum1] = useLocalStorage("num1", 0);
  const [num2, setNum2] = useLocalStorage("num2", 0);
  const [value, setValue] = useState("");
  const id = useId();

  const add = useMemo(() => {
    console.log("add function run");
    return num1 + num2;
  }, [num1, num2]);

  const addCallback = useCallback(() => {
    console.log("addCallback function run");
    return num1 + num2;
  }, [num1, num2]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h4>Number 1</h4>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setNum1(parseInt(e.target.value))}
            value={num1}
          />
        </div>
        <div className="col-md-6">
          <h4>Number 2</h4>
          <input
            type="number"
            className="form-control"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <button
            className="btn btn-primary"
            onClick={() => {
              const val = addCallback();
              setValue(val);
            }}
          >
            Add
          </button>
        </div>
        <div className="col-md-6">
          <h3>Result of Memo : {add}</h3>
          <h3>Result of Callback : {value}</h3>
        </div>
      </div>
    </div>
  );
}

export default MemoHook;

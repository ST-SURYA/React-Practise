import React, { createContext, useEffect, useRef, useState } from "react";
import ChildOne from "./childOne";
import { useDispatch } from "react-redux";
import { setContextValue } from "../../redux/slices/contextSlice";
export const contexProps = createContext("");
const ParentCmp = () => {
  const [inpVal, setInpVal] = useState("");
  const [memo, setMemo] = useState(5);
  const count = useRef(0);
  const dispatch = useDispatch();
  sessionStorage.setItem("kk", "ll");

  useEffect(() => {
    count.current = count.current + 1;
  });

  useEffect(() => {
    // Perform memoization-related action here
    console.log("memo run");
  }, [memo]); // This effect runs when 'memo' changes

  return (
    <div className="container mt-3 w-50 m-auto card p-2">
      <contexProps.Provider value={inpVal}>
        <h3 className="text-center mb-3">Parent component {count.current}</h3>
        <input
          type="text"
          className="form-control mb-3"
          onChange={(e) => setInpVal(e.target.value)}
        />
        <h4 className="text-center mb-3">Redux field</h4>
        <input
          type="text"
          id="rc"
          className="form-control mb-3"
          onChange={() =>
            dispatch(
              setContextValue({
                value: document.getElementById("rc").value,
              })
            )
          }
        />

        <h2 className="text-center">UseMemo</h2>
        <input type="number" id="memo" className="form-control mb-3" />
        <button
          className="btn btn-primary d-block mx-auto"
          onClick={() => {
            const newMemo = document.getElementById("memo").value;
            setMemo(newMemo);
          }}
        >
          Click
        </button>
        <ChildOne />
      </contexProps.Provider>
    </div>
  );
};

export default ParentCmp;

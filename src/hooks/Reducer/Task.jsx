import React from "react";

const Task = ({ todo, dispatch }) => {
  return (
    <div className="d-flex align-items-center justify-content-between border p-3 mb-2">
      <h3 style={{ color: todo.complete ? "green" : "red" }}>{todo.title}</h3>
      <div>
        <button
          className="btn btn-secondary m-1"
          onClick={() => {
            dispatch({ type: "change", payload: { id: todo.id } });
          }}
        >
          {todo.complete ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => {
            dispatch({ type: "delete", payload: { id: todo.id } });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;

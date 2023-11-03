import React, { useReducer, useRef, useState } from "react";
import Task from "./Task";
import HOC from "../../components/hoc";

function reducer(todos, action) {
  switch (action.type) {
    case "add":
      return [...todos, action.payload];
    case "change":
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case "delete":
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

const Todos = () => {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  const id = useRef(100);
  const [num, setnum] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: { id: id.current, title: task, complete: false },
    });
    setTask("");
    id.current += 1;
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className="form-group w-25 mx-auto">
        <label className="text-center d-block font-weight-bold">Add task</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="form-control"
        />
      </form>
      <div className="mt-3 w-50 m-auto">
        {todos.map((todo) => (
          <Task key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};

export default HOC(Todos);

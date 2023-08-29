import React from "react";
import { MdDelete } from "react-icons/md";
const Delete = ({ onClick }) => {
  return (
    <span className="m-1" onClick={onClick}>
      <MdDelete size={18} />
    </span>
  );
};

export default Delete;

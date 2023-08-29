import React from "react";
import { RiEdit2Line } from "react-icons/ri";
const EditIcon = ({ onClick }) => {
  return (
    <span onClick={onClick} className="m-1">
      <RiEdit2Line size={18} />
    </span>
  );
};

export default EditIcon;

import React from "react";

const InputField = ({ ...props }) => {
  return (
    <>
      <input {...props} className="form-control" />
    </>
  );
};

export default InputField;

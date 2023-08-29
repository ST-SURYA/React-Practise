import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", {
        replace: true,
        state: { message: "Page Redirected" },
      });
    }, 2000);
  });
  return (
    <div className="text-center mt-5 text-danger">
      <label className="form-label">Page Not Found</label>
      <br />
      <Spinner />
    </div>
  );
};

export default NotFound;

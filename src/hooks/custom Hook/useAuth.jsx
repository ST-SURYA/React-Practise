import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(() =>
    JSON.parse(localStorage.getItem("authStatus") || false)
  );
  const userDetails = { userName: "user", password: "user" };

  const authenticateUser = (userName, password) => {
    if (
      userName === userDetails.userName &&
      password === userDetails.password
    ) {
      localStorage.setItem("authStatus", "true");
      setIsAuth(() => JSON.parse(localStorage.getItem("authStatus")));
    } else {
      localStorage.setItem("authStatus", "false");
      setIsAuth(() => JSON.parse(localStorage.getItem("authStatus")));
    }
  };
  return [isAuth, authenticateUser];
};

export default useAuth;

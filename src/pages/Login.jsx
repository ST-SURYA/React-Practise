import React, { useContext, useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineWifiPassword } from "react-icons/md";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/custom Hook/useAuth";
import { authProps } from "../router/Routing";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, authenticateUser] = useAuth();
  const getAuthStatus = useContext(authProps);
  const navigate = useNavigate();
  // For router state obj
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(location.state?.message);

  const handleLogin = async () => {
    console.log(userName, password);
    authenticateUser(userName, password);
  };

  const hideAlert = () => {
    location.state.message = undefined;
    setShowAlert(location.state.message);
    console.log(location.state.message);
  };

  if (showAlert) {
    // Hide the alert after 5 seconds if it is shown
    setTimeout(hideAlert, 5000);
  }
  useEffect(() => {
    if (isAuth) {
      console.log("Authentication successful!");
      localStorage.setItem("authStatus", isAuth.toString());
      getAuthStatus();
      navigate("/", { replace: true });
    } else {
      console.log("Authentication not successful!");
      localStorage.setItem("authStatus", isAuth.toString());
      getAuthStatus();
    }
  }, [isAuth]);
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-secondary">
      <div className="text-center">
        {showAlert && (
          <div className="alert alert-danger">{location.state?.message}</div>
        )}
        <form className="w-100 mx-auto card" style={{ maxWidth: "400px" }}>
          <h3 className="card-title">Login</h3>
          <div className="card-body  m-3">
            <div className="mb-3">
              <div className="input-group">
                <BiUserCircle size={40} className="m-2" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <MdOutlineWifiPassword size={40} className="m-2" />
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              <Button name="Login" action={handleLogin} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

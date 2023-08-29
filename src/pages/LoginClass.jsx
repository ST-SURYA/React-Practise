import React, { Component } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineWifiPassword } from "react-icons/md";
import Button from "../components/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  userDetails = { userName: "user", password: "user" };

  authentication = () => {
    const { userName, password } = this.state;
    if (userName === this.userDetails.userName && password === this.userDetails.password) {
      console.log("successful");
      console.log(this.state);
    } else {
      console.log("incorrect user credentials");
      console.log(this.state);

    }
  };

  handleUsernameChange = (e) => {
    this.setState({ userName: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { userName, password } = this.state;

    return (
      <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-secondary">
        <div className="text-center">
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
                    onChange={this.handleUsernameChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <MdOutlineWifiPassword size={40} className="m-2" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              <div className="text-center">
                <Button name="Login" action={this.authentication} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;


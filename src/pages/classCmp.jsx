import React, { Component } from "react";

class ClassCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("Component did mount , Only on intial render");
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update , After state change");
    if (prevState.count !== this.state.count) {
      console.log("Count state changed:", this.state.count);
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return (
      <div className="container mt-5">
        <p className="text-center display-6">Class Component with Lifecycle</p>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p className="text-center">Count: {this.state.count}</p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary m-1"
                    onClick={this.handleIncrement}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={this.handleDecrement}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassCmp;

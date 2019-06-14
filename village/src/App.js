import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

import axios from "axios";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState(() => ({ smurfs: response.data }));
      })
      .catch(error => console.error("server error", error));
  }

  addSmurf = smurf => {
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(res => {
        this.setState({ smurfs: res.data });
        this.props.history.push("/smurf-list");
      })
      .then(err => console.log(err));
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className='App'>
        <nav>
          <div className='link'>
            <NavLink exact to='/'>
              Smurfs
            </NavLink>
          </div>
          <div className='link'>
            <NavLink exact to='/smurf-form'>
              Smurf Form
            </NavLink>
          </div>
        </nav>
        <Route
          exact
          path='/smurf-form'
          render={props => (
            <SmurfForm
              smurfs={this.state.smurfs}
              addSmurf={this.addSmurf}
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/'
          render={props => <Smurfs smurfs={this.state.smurfs} {...props} />}
        />
      </div>
    );
  }
}

// const AppWithRouter = WithRouter(App);

export default App;

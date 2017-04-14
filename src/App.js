import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/nav";

import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import Profile from "./views/profile";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/u/:username" component={Profile} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

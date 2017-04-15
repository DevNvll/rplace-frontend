import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/nav";
import LoginModal from "./components/loginModal";
import RegisterModal from "./components/registerModal";

import Home from "./views/home";
import Profile from "./views/profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false
    };
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }
  toggleLogin() {
    this.setState({ loginModal: !this.state.loginModal });
  }
  toggleRegister() {
    this.setState({ registerModal: !this.state.registerModal });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar
            toggleLogin={this.toggleLogin}
            toggleRegister={this.toggleRegister}
          />
          <LoginModal
            loginModal={this.state.loginModal}
            toggleLogin={this.toggleLogin}
          />
          <RegisterModal
            registerModal={this.state.registerModal}
            toggleRegister={this.toggleRegister}
            toggleLogin={this.toggleLogin}
          />
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/u/:username" component={Profile} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

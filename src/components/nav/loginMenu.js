import React, { Component } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import * as auth from "../../utils/auth";

export default class LoginButtons extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    if (auth.checkAuth()) {
      let profile = auth.getProfile();
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <NavLink
                onClick={this.toggle}
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={this.state.dropdownOpen}
              >
                {profile.username}
              </NavLink>
              <DropdownMenu right>
                <DropdownItem
                  tag={RouterLink}
                  to={"/u/" + profile.username}
                  exact
                >
                  Profile
                </DropdownItem>
                <DropdownItem onClick={auth.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={this.props.toggleLogin} href="#">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.toggleRegister} href="#">
              Register
            </NavLink>
          </NavItem>
        </Nav>
      );
    }
  }
}

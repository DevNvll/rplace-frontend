import React, { Component } from 'react'
import { NavLink as RouterLink} from 'react-router-dom';
import {  
  Nav, 
  NavItem, 
  NavLink, 
  Dropdown, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

import * as auth from '../../utils/auth'

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
   if(auth.checkAuth()) {
      let profile = auth.getProfile()
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
                <DropdownItem onClick={auth.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      )
    } else {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RouterLink} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterLink} to="/register">Sign Up</NavLink>
            </NavItem>
          </Nav>
      )
    }
  }
}
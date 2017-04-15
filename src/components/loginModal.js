import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import LoginForm from "./forms/loginForm";

export default class LoginModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.loginModal}
          toggle={this.props.toggleLogin}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleLogin}>Login</ModalHeader>
          <ModalBody>
            <LoginForm toggleLogin={this.props.toggleLogin} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

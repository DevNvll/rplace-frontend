import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import RegisterForm from "./forms/registerForm";

export default class LoginModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.registerModal}
          toggle={this.props.toggleRegister}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleRegister}>Sign Up</ModalHeader>
          <ModalBody>
            <RegisterForm
              toggleRegister={this.props.toggleRegister}
              toggleLogin={this.props.toggleLogin}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

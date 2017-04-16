import React, { Component } from "react";
import { Button, Label, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import {
  AvForm as Form,
  AvField as Input,
  AvGroup as FormGroup,
  AvFeedback
} from "availity-reactstrap-validation";
import { ModalFooter } from "reactstrap";

import { checkAuth, register } from "../../utils/auth";
import STATUS_CODES from "../../utils/statusCodes";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      errorVisible: false
    };
    this.gotoLogin = this.gotoLogin.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onError = this.onError.bind(this);
  }
  onDismiss() {
    this.setState({ errorVisible: false });
  }
  onRegister() {
    this.forceUpdate();
    this.props.toggleRegister();
  }
  onError(err) {
    this.setState({ errorVisible: true, errcode: STATUS_CODES[err] });
  }
  onSubmit(e, values) {
    register(
      values.username,
      values.email,
      values.password,
      this.onRegister,
      this.onError
    );
  }
  render() {
    return (
      <div>
        <Form onValidSubmit={this.onSubmit}>
          <Alert
            color="danger"
            isOpen={this.state.errorVisible}
            toggle={this.onDismiss}
          >
            {this.state.errcode}
          </Alert>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="your username"
              minLength={5}
              required
            />
            <AvFeedback>Username must have at least 5 characters</AvFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="your password"
              minLength={6}
              required
            />
            <AvFeedback>Passwords must have at least 6 characters</AvFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Confirm password</Label>
            <Input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="confirm your password"
              validate={{ match: { value: "password" } }}
              required
            />
            <AvFeedback>Passwords must match</AvFeedback>
          </FormGroup>
          <ModalFooter>
            <Button color="primary">Register</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

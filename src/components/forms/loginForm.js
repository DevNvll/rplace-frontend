import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
import Recaptcha from "react-google-recaptcha";
import { ModalFooter } from "reactstrap";

import { login, checkAuth } from "../../utils/auth";
import STATUS_CODES from "../../utils/statusCodes";
import { CAPTCHA_SITE_KEY } from "../../config";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorVisible: false,
      recaptcha: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLoginError = this.onLoginError.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onCaptcha = this.onCaptcha.bind(this);
  }
  onDismiss() {
    this.setState({ errorVisible: false });
  }
  onCaptcha(code) {
    this.setState({ recaptcha: code });
  }
  onLogin(credentials) {
    this.props.toggleLogin();
  }
  onLoginError(err) {
    this.setState({ errorVisible: true, errcode: STATUS_CODES[err] });
  }
  onSubmit(e) {
    e.preventDefault();
    login(
      e.target.email.value,
      e.target.password.value,
      this.state.recaptcha,
      this.onLogin,
      this.onLoginError
    );
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Alert
            color="danger"
            isOpen={this.state.errorVisible}
            toggle={this.onDismiss}
          >
            {this.state.errcode}
          </Alert>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="your email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="your password"
            />
          </FormGroup>
          <Recaptcha
            ref="recaptcha"
            sitekey={CAPTCHA_SITE_KEY}
            onChange={this.onCaptcha}
          />
          <br />
          <ModalFooter>
            <Button color="primary">Login</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

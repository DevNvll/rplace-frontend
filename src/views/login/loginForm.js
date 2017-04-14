import React, { Component } from 'react'
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Alert
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import Recaptcha from 'react-google-recaptcha'

import { login, checkAuth } from '../../utils/auth'
import STATUS_CODES from '../../utils/statusCodes'
import { CAPTCHA_SITE_KEY } from '../../config'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorVisible: false,
      recaptcha: null
    }
  }
  onDismiss() {
    this.setState({errorVisible: false})
  }
  onCaptcha(code) {
    this.setState({recaptcha: code})
  }
  onLogin(credentials) {
    this.forceUpdate()
  }
  onLoginError(err) {
    this.setState({errorVisible: true, errcode: STATUS_CODES[err]})
  }
  onSubmit(e) {
    e.preventDefault()
    login(e.target.email.value, e.target.password.value, this.state.recaptcha, this.onLogin.bind(this), this.onLoginError.bind(this))
  }
  render() {
    if(checkAuth()) {
      return (
        <Redirect to="/"/>
      )
    }
    return(
      <div>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Alert color="danger" isOpen={this.state.errorVisible} toggle={this.onDismiss.bind(this)}>{this.state.errcode}</Alert>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input type="text" name="email" id="email" placeholder="your email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="your password" />
          </FormGroup>
          <Recaptcha ref="recaptcha" sitekey={CAPTCHA_SITE_KEY} onChange={this.onCaptcha.bind(this)} />
          <Button color="primary">Login</Button> <Link to="/register">Create an account</Link>
        </Form>
      </div>
    );
  }
}
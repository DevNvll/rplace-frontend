import React, { Component } from 'react'
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import Recaptcha from 'react-google-recaptcha'

import { login, checkAuth } from '../../utils/auth'


export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordError: false,
      recaptcha: null
    }
  }
  onCaptcha(code) {
    this.setState({recaptcha: code})
  }
  onLogin(credentials) {
    this.forceUpdate()
  }
  onLoginError(err) {
    this.setState({passwordError: true})
  }
  onSubmit(e) {
    e.preventDefault();
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
          {(this.state.passwordError && (<h5>Wrong email/password</h5>))}
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input type="text" name="email" id="email" placeholder="your email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="your password" />
          </FormGroup>
          <Recaptcha ref="recaptcha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={this.onCaptcha.bind(this)} />
          <Button color="primary">Login</Button> <Link to="/register">Create an account</Link>
        </Form>
      </div>
    );
  }
}
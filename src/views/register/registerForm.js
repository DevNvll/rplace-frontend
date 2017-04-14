import React, { Component } from 'react'
import { 
  Button,
  Label,
  Alert
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import { AvForm as Form, AvField as Input, AvGroup as FormGroup, AvFeedback } from 'availity-reactstrap-validation';

import {checkAuth, register} from '../../utils/auth'
import STATUS_CODES from '../../utils/statusCodes'

import Success from './successMessage'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registered: false,
      errorVisible: false
    }
  }
  onDismiss() {
    this.setState({errorVisible: false})
  }
  onRegister() {
    this.setState({registered: true})
  }
  onError(err) {
    this.setState({errorVisible: true, errcode: STATUS_CODES[err]})
  }
  onSubmit(e, values) {
    register(values.username, values.email, values.password, this.onRegister.bind(this), this.onError.bind(this))
  }
  render() {
    if (checkAuth()) {
      return (
        <Redirect to="/" />
      )
    }
    if(this.state.registered) {
      return(<Success />)
    }
    return(
      <div>
        <Form onValidSubmit={this.onSubmit.bind(this)}>
          <Alert color="danger" isOpen={this.state.errorVisible} toggle={this.onDismiss.bind(this)}>{this.state.errcode}</Alert>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="your username" minLength={5} required/>
            <AvFeedback>Username must have at least 5 characters</AvFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input type="email" name="email" id="email" placeholder="example@gmail.com" required/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="your password" minLength={6} required/>
            <AvFeedback>Passwords must have at least 6 characters</AvFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Confirm password</Label>
            <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="confirm your password" validate={{match:{value:'password'}}} required/>
            <AvFeedback>Passwords must match</AvFeedback>
          </FormGroup>
          <Button color="primary">Register</Button> <Link to="/login">Login to your account</Link>
        </Form>
      </div>
    )
  }
}
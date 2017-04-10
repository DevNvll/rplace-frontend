import React, { Component } from 'react'
import { Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

import {checkAuth, register} from '../../utils/auth'
import Success from './successMessage'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registered: false
    }
  }
  onRegister() {
    this.setState({registered: true})
  }
  onSubmit(e) {
    e.preventDefault()
    if(e.target.password.value === e.target.passwordConfirm.value)
      register(e.target.username.value, e.target.email.value, e.target.password.value, this.onRegister.bind(this))
    else
      console.log("password didn't match")
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
        <Form onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="your username" />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="example@gmail.com" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="your password" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Confirm password</Label>
            <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="confirm your password" />
          </FormGroup>
          <Button color="primary">Register</Button> <Link to="/login">Login to your account</Link>
        </Form>
      </div>
    )
  }
}
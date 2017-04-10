import React, { Component } from 'react'
import { Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

import {checkAuth} from '../../utils/auth'


export default class RegisterForm extends Component {
  onSubmit(e) {
    e.preventDefault()
  }
  render() {
    if (checkAuth()) {
      return (
        <Redirect to="/" />
      )
    }
    return(
      <div>
        <Form onSubmit={this.onSubmit}>
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
          <Button color="primary">Register</Button> <Link to="/login">Login to your account</Link>
        </Form>
      </div>
    )
  }
}
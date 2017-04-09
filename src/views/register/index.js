import React, { Component } from 'react'
import { Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import request from 'axios'

import {checkAuth} from '../../utils/auth'

export default class Login extends Component {
  onSubmit(e) {
    e.preventDefault();
    let credentials = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    request.post('http://localhost:5000/register', credentials).then((data) => { // receiving the famous 'Access-Control-Allow-Origin' for now
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    if(checkAuth()) {
      return (
        <Redirect to="/"/>
      )
    }
    return(
      <div>
        <h1>Register now</h1>
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
    );
  }
}
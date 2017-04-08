import React, { Component } from 'react'
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { Link } from 'react-router-dom'
import request from 'axios'

export default class Login extends Component {
  onSubmit(e) {
    e.preventDefault();
    let credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    request.post('http://localhost:5000/login', credentials).then((data) => { // receiving the famous 'Access-Control-Allow-Origin' for now
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    return(
      <div>
        <h1>Login now</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="your username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="your password" />
          </FormGroup>
          <Button color="primary">Login</Button> <Link to="/register">Create an account</Link>
        </Form>
      </div>
    );
  }
}
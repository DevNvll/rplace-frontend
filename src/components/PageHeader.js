import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Jumbotron
          style={{
            backgroundColor: "#222",
            color: "#fff",
            borderRadius: "0px",
            height: "120px",
            paddingTop: "35px"
          }}
        >
          <Container
            style={{
              marginLeft: "30px"
            }}
          >
            <h1>{this.props.title}</h1>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

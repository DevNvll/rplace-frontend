import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { getInfo } from "../../utils/auth";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    getInfo(this.props.match.params.username)
      .then(data => {
        this.setState(data);
      })
      .catch(err => {});
  }
  render() {
    const username = this.props.match.params.username;
    return (
      <div>
        <center>
          <h1>{username}</h1>
          <Row>
            <Col xs="6"><h5>{this.state.total_changed} blocks placed</h5></Col>
            <Col xs="6">
              {
                new Date(1000 * this.state.last_time)
                  .toLocaleString()
                  .split(" ")[0]
              }
              {" "}
              <b>X: </b>
              {" "}
              {this.state.last_x}
              {" "}
              <b>Y: </b>
              {" "}
              {this.state.last_y}
              {" "}
              <i style={{ color: "#DDE5BA", border: "2x solid black" }}>•</i>
            </Col>
          </Row>
        </center>
      </div>
    );
  }
}

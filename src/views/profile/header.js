import React, { Component } from "react";
import { Row, Col, Jumbotron, Container } from "reactstrap";

export default class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <Jumbotron
          style={{
            backgroundColor: "#222",
            color: "#fff",
            borderRadius: "0px",
            height: "120px",
            paddingTop: "20px"
          }}
        >
          <Container>
            <Row>
              <Col xs="6">
                <h1 style={{ fontWeight: "bold" }}>
                  {this.props.data.username}
                </h1>
                placing since 17/08/59
              </Col>
              <Col xs="3">
                <ul className="list-inline" style={{ textAlign: "center" }}>
                  <li style={{ width: "125px" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "4em",
                        display: "block",
                        lineHeight: "1em"
                      }}
                    >
                      {this.props.data.total_changed}
                    </span>
                    Blocks Placed
                  </li>
                </ul>
              </Col>
              <Col xs="3">
                <ul className="list-inline" style={{ textAlign: "center" }}>
                  <li>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "4em",
                        display: "block",
                        lineHeight: "1em"
                      }}
                    >
                      <i
                        className="fa fa-square"
                        style={{ color: this.props.data.last_color }}
                      />
                    </span>
                    {(this.props.data.last_x &&
                      "(" +
                        this.props.data.last_x +
                        "," +
                        this.props.data.last_y +
                        ")") ||
                      "No Blocks"}
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

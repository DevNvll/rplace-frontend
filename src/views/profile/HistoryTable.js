import React, { Component } from "react";
import { Container, Table } from "reactstrap";

import { getColorById } from "../../utils/colors";
import { getUserHistory } from "../../utils/api";

export default class ProfileHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    getUserHistory(this.props.user).then(({ data }) => {
      this.setState({ data });
    });
  }
  render() {
    return (
      <Container>
        <h1>History</h1>
        <Table bordered size="sm" striped>
          <thead>
            <tr>
              <th width="5%">Color</th>
              <th width="5%">X</th>
              <th width="5%">Y</th>
              <th width="75%">Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data &&
              this.state.data.history.map((block, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <center>
                        <i
                          className="fa fa-square"
                          style={{ color: getColorById(block.color).hash }}
                        />
                      </center>
                    </td>
                    <td>{block.x}</td>
                    <td>{block.y}</td>
                    <td>
                      {new Date(block.date_modified * 1000).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

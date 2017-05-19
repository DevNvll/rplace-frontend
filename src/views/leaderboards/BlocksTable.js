import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import moment from "moment";

import { getColorById } from "../../utils/colors";

export default class LeaderboardTable extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      index: 1,
      rankData: []
    };
  }

  render() {
    return (
      <div>
        <Container>
          <Table bordered size="sm" striped>
            <thead>
              <tr>
                <th>Coordinates</th>
                <th>Color</th>
                <th>Times changed</th>
                <th>Last changed by</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {this.props.rankData &&
                this.props.rankData.map((block, i) => {
                  return (
                    <tr key={i}>
                      <td style="text-align: center;">
                        ({block.color.x}, {block.color.y})
                      </td>
                      <td style="text-align: center;">
                        {" "}<i
                          className="fa fa-square"
                          style={{
                            color: getColorById(block.color).hash
                          }}
                        />
                      </td>
                      <td style="text-align: center;">{block.times_changed}</td>
                      <td style="text-align: center;">{block.username}</td>
                      <td>
                        {moment(block.date_modified * 1000).format(
                          "MMMM Do YYYY [@] h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import moment from "moment";

import { getColorById, getFavoriteColor } from "../../utils/colors";

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
                <th>Username</th>
                <th>Total Blocks</th>
                <th>Faction</th>
                <th>Favorite Color</th>
                <th>Last Block</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {this.props.rankData &&
                this.props.rankData.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <center>
                          {user.username}
                        </center>
                      </td>
                      <td><center>{user.total_changed}</center></td>
                      <td><center>{user.faction_key}</center></td>
                      <td>
                        {" "}<center>
                          {" "}<i
                            className="fa fa-square"
                            style={{
                              color: getColorById(
                                getFavoriteColor(user.color_dict)
                              ).hash
                            }}
                          />
                        </center>
                      </td>
                      <td>
                        {" "}
                        <center>
                          <i
                            className="fa fa-square"
                            style={{
                              color: getColorById(
                                user.last_block.color
                                  ? user.last_block.color
                                  : "A"
                              ).hash
                            }}
                          />
                        </center>
                      </td>
                      <td>
                        {moment(user.date_joined * 1000).format(
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

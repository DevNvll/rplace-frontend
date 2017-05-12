import React, { Component } from "react";
import { Container } from "reactstrap";

import { getInfo } from "../../utils/api";
import { getColorById } from "../../utils/colors";

import ProfileHeader from "./Header";
import History from "./HistoryTable";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_color: "A"
    };
  }
  async componentWillMount() {
    document.title =
      this.props.match.params.username + "'s Profile | RPlace.io";
    let data = await getInfo(this.props.match.params.username);
    this.setState({
      ...data,
      last_color: data.last_color ? getColorById(data.last_color).hash : "A"
    });
  }
  render() {
    if (this.state.notFound)
      return (
        <Container>
          <h1>User "{this.props.match.params.username}" not found</h1>
        </Container>
      );
    return (
      <div>
        <ProfileHeader data={this.state} />
        <History user={this.props.match.params.username} />
      </div>
    );
  }
}

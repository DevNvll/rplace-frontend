import React, { Component } from "react";
import { Container } from "reactstrap";

import { getInfo } from "../../utils/api";
import { getColorById } from "../../utils/colors";

import ProfileHeader from "./header";
import History from "./history";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_color: "A"
    };
  }
  componentWillMount() {
    document.title =
      this.props.match.params.username + "'s Profile | RPlace.io";
    getInfo(this.props.match.params.username)
      .then(data => {
        this.setState({
          ...data,
          last_color: data.last_color ? getColorById(data.last_color).hash : "A"
        });
      })
      .catch(err => {
        console.log(err);
        if (
          err.response &&
          err.response.data.error.status_code === "not_found_user_username"
        )
          this.setState({ notFound: true });
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

import React, { Component } from "react";

import Board from "../../components/board";

export default class Home extends Component {
  componentWillMount() {
    document.title = "RPlace.io";
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Board />
      </div>
    );
  }
}

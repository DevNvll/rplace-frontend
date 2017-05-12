import React, { Component } from "react";
import classnames from "classnames";
import {
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import PageHeader from "../../components/PageHeader";
import RankTable from "./UsersTable";
import BlocksTable from "./BlocksTable";

import { getLeaderboard } from "../../utils/api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      usersData: [],
      factionsData: [],
      blocksData: []
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }
  async componentWillMount() {
    let usersData = await getLeaderboard("users");
    this.setState({ usersData: usersData });
    // let factionsData = await getLeaderboard("factions");
    // this.setState({ factionsData: factionsData });
    let blocksData = await getLeaderboard("blocks");
    this.setState({ blocksData: blocksData });
  }
  render() {
    return (
      <div>
        <PageHeader title="Leaderboards" />
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggleTab("1");
                }}
              >
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggleTab("2");
                }}
              >
                Factions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggleTab("3");
                }}
              >
                Blocks
              </NavLink>
            </NavItem>
          </Nav><br />
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h1>Top 500 users</h1><br />
                  <RankTable rankData={this.state.usersData} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h1>Top 500 factions</h1><br />
                  <RankTable rankData={this.state.usersData} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <h1>Top 500 blocks</h1><br />
                  <BlocksTable rankData={this.state.blocksData} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}

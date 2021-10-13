import React, { Component } from "react";
import {Switch, Route, Link, Router} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar} from "react-bootstrap";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import PublicNavbar from "./components/public.navbar";
//TODO import IUser from './types/user.type';


import Home from "./components/home.component";
import { Container } from "react-bootstrap";
import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";
import { connect } from "react-redux";
import UserProfile from "./components/user-profile.component";

//TODO import EventBus from "./common/EventBus";

type Props = any;

type State = {
  //TODO readapt this later
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: string | undefined
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logout = this.logout.bind(this);

    //TODO readapt this later
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    }

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    //TODO EventBus.on("logout", this.logout);
  }

  componentWillUnmount() {
    //TODO EventBus.remove("logout", this.logout);
  }

  private logout() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
        <Router history={history}>
          <Container>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">
                <Link to={"/"}>postii</Link>
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/register">
                  <Link to={"/register"}>Register</Link>
                </Nav.Link>
                <Nav.Link href="/about">
                  <Link to={"/about"}>About</Link>
                </Nav.Link>
                <Nav.Link href="/pricing">
                  <Link to={"/pricing"}>Pricing</Link>
                </Nav.Link>

                {currentUser && (
                    <Nav.Link href="/profile">
                      <Link to={"/profile"}>Profile</Link>
                    </Nav.Link>
                )}
              </Nav>
            </Navbar>
            <Container className="container mt-3">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/profile" component={UserProfile} />
              </Switch>
            </Container>
          </Container>
        </Router>
    );
  }
}

function mapStateToProps(state: any) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(App);

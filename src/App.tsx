import React, { Component } from "react";
import {Switch, Route, Link, Router} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar} from "react-bootstrap";
import "./App.css";

import store from "./store"

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import PublicNavbar from "./components/public.navbar";
//TODO import IUser from './types/user.type';


import Home from "./components/home.component";
import { AboutComponent } from "./components/about.component";
import UserProfile from "./components/user-profile.component";

import { Container } from "react-bootstrap";
import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";
import { Provider } from "react-redux";

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

    // history.listen((location) => {
    //   props.dispatch(clearMessage());
    // });
    console.log("App constructor called");
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
        <Provider store={store}>
          <Router history={history}>
            <PublicNavbar />
            <Container className="container mt-3">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/about" component={AboutComponent} />
              </Switch>
            </Container>
          </Router>
        </Provider>
    );
  }
}

export default App;

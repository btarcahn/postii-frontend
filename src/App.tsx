import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./App.css";

import AuthService from "./services/auth.service";
import PublicNavbar from "./components/public.navbar";
//TODO import IUser from './types/user.type';


import { Login, LoginComponent } from "./components/login.component";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Container} from "react-bootstrap";
import RegisterForm from "./components/register.form";

//TODO import EventBus from "./common/EventBus";

type Props = {};

type State = {
  //TODO readapt this later
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: string | undefined
};

// const App: React.FC = () => {
//   return (
//       <LoginComponent />
//   );
// };

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
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
    //     showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    //   });
    // }
    //TODO EventBus.on("logout", this.logout);
  }

  componentWillUnmount() {
    //TODO EventBus.remove("logout", this.logout);
  }

  logout() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    });
  }

  render() {
    return (
        <div>
          <Container>
            <PublicNavbar />
          </Container>

          <Container>
            <Switch>
              <Route exact path={["/", "/home"]} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Login} />
              {/*<Route exact path="/profile" component={Profile} />*/}
              {/*<Route path="/user" component={BoardUser} />*/}
              {/*<Route path="/mod" component={BoardModerator} />*/}
              {/*<Route path="/admin" component={BoardAdmin} />*/}
            </Switch>
          </Container>
        </div>


    );
  }
}

export default App;

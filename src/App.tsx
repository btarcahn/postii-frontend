import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service"
//TODO import IUser from './types/user.type';


import { Login, LoginComponent } from "./components/login.component";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

//TODO import EventBus from "./common/EventBus";

type Props = {};

type State = {
  //TODO readapt this later
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: string | undefined
};

const App: React.FC = () => {
  return (
      <LoginComponent />
  );
};

// class App extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.logout = this.logout.bind(this);
//
//     //TODO readapt this later
//     this.state = {
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined
//     }
//   }
//
//   componentDidMount() {
//     const user = AuthService.getCurrentUser();
//
//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }
//     //TODO EventBus.on("logout", this.logout);
//   }
//
//   componentWillUnmount() {
//     //TODO EventBus.remove("logout", this.logout);
//   }
//
//   logout() {
//     AuthService.logout();
//     this.setState({
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined
//     });
//   }
//
//   render() {
//     return (
//         <AppBar position="static">
//           <Toolbar variant="dense">
//             <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//
//             </IconButton>
//             <Typography variant="h6" color="inherit" component="div">
//               Postii
//             </Typography>
//           </Toolbar>
//         </AppBar>
//     );
//   }
// }

export default App;

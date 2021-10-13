import React, { Component, useState } from "react";
import {Route, RouteComponentProps, Switch, useHistory} from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Col, Row, Container, Form, Button, Image } from "react-bootstrap";

import UserService from "../services/user.service";
import LoginForm from "./login.form";
import RegisterForm from "./register.form";
import { NilComponent } from "./nil.component";

import { connect } from "react-redux";

interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    success: boolean,
    content: string
};

/**
 * Frontpage, public component
 *
 * @version 2.0
 * @author btarcahn
 */
class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            success: false,
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    success: true,
                    content: response.data.message
                });
            }
        ).catch(error => {
            this.setState({
                success: false,
                content: (error.response && error.response.code) ||
                    error.message ||
                    error.toString()
            });
        });
    }

    render() {

        return this.state.success ? (
            // <div>
            //     <Container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
            //         <Row style={{ verticalAlign: "middle" }}>
            //             <Col xs={12} sm={6}>
            //                 <Image src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            //                      fluid alt="a happy dog running on the beach" />
            //             </Col>
            //             <Col xs={12} sm={6} style={{ padding: 10 }}>
            //                 <Row>
            //                     <Container style={{ height:'25vh' }}/>
            //                     <Container style={{ maxWidth: '50vh' }}>
            //                         <h3>Let's get you in...</h3>
            //                     </Container>
            //                     <Container style={{ maxWidth:'50vh' }}>
            //                         <Switch>
            //                             <Route exact path={["/", "/home"]} component={LoginForm} />
            //                             <Route exact path="/login" component={LoginForm} />
            //                             <Route exact path="/register" component={RegisterForm} />
            //                         </Switch>
            //                     </Container>
            //                 </Row>
            //             </Col>
            //         </Row>
            //     </Container>
            // </div>
            <Container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
                <h3>{this.state.content}</h3>
            </Container>
        ) : (
            <Container>
                <NilComponent />
            </Container>
        );
    }
}

function mapStateToProps(state: State) {
    const success = state.success;
    const content = state.content;

    return { success, content };
}

export default connect(mapStateToProps)(Home);

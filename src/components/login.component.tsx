import React, { Component, useState } from "react";
import {Route, RouteComponentProps, Switch, useHistory} from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Col, Row, Container, Form, Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import AuthService from "../services/auth.service"
import LoginForm from "./login.form";
import RegisterForm from "./register.form";

interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  email: string,
  password: string,
  loading: boolean,
  message: string
};

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        }
    }

    validationSchema() {
        return Yup.object().shape({
           email: Yup.string().required("Email is mandatory."),
           password: Yup.string().required("Password is mandatory")
        });
    }

    handleLogin(formValue: { email: string, password: string }) {
        const { email, password } = formValue;

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(email, password).then(() => {
            this.props.history.push("/creators");
            window.location.reload();
        }, error => {
            const resMessage =
                (error.response && error.response.data
                    && error.response.data.message) ||
                error.message || error.toString();

            this.setState({
                loading: false,
                message: resMessage
            })
        });
    }

    render() {
        const { loading, message } = this.state;

        // const initialValues = {
        //     email: "",
        //     password: ""
        // }

        return (
            <div>
                <Container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
                    <Row style={{ verticalAlign: "middle" }}>
                        <Col xs={12} sm={6}>
                            <Image src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                                 fluid alt="a happy dog running on the beach" />
                        </Col>
                        <Col xs={12} sm={6} style={{ padding: 10 }}>
                            <Row>
                                <Container style={{ height:'25vh' }}/>
                                <Container style={{ maxWidth: '50vh' }}>
                                    <h3>Let's get you in...</h3>
                                </Container>
                                <Container style={{ maxWidth:'50vh' }}>
                                    <Switch>
                                        <Route exact path={["/", "/home"]} component={LoginForm} />
                                        <Route exact path="/login" component={LoginForm} />
                                        <Route exact path="/register" component={RegisterForm} />
                                    </Switch>
                                </Container>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * Legacy login component
 *
 * @deprecated Will be removed in release
 * @author btarcahn
 * @constructor
 */
const LoginComponent: React.FC = () => {
    return (
        <div>
            <Grid container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
                <Grid item xs={12} sm={6}>
                    <Image fluid src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                         alt="a happy dog running on the beach" />
                </Grid>
                <Grid container item xs={12} sm={6} alignItems="center"
                      justifyContent="space-between"
                      direction="column" style={{ padding: 10 }}>
                    <div />
                    <div style={{ display: 'flex', flexDirection: 'column',
                        maxWidth: 400, minWidth:300}}>
                        <Grid container style={{ justifySelf: 'center' }}>
                            <h1>Let's get you in...</h1>
                        </Grid>
                        <TextField label="email" margin="normal" type="email"/>
                        <TextField label="password" margin="normal" type="password"/>
                        <div style={{ height: 20 }} />
                        <Button color="primary" variant="contained">Login</Button>
                        <Button>Get an account</Button>
                    </div>
                    <div />
                </Grid>
            </Grid>
        </div>
    );
};

export { Login, LoginComponent };

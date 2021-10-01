import React from "react";
import { Button, Form } from "react-bootstrap";

import AuthService from "../services/auth.service";
import {RouteComponentProps, useHistory} from "react-router-dom";

interface RouterProps {
    history: string;
}

type FormProps = RouteComponentProps<RouterProps>;

type FormState = {
    email: string,
    password: string
}

/**
 * The login form component, contains the form and functions to handle login.
 *
 * @version 1.0
 * @author btarcahn
 */
export default class LoginForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    private doLogin(formVal: { email: string, password: string }) {
        const { email, password } = formVal;

        AuthService.login(email, password)
            .then((response) => {
                switch (response.status) {
                    case 201:
                        alert("Login successful");
                        break;
                    case 422:
                        alert("Invalid login credentials");
                        break;
                }
            });
    }

    /**
     * Handle submit event of Form.
     * @param e event
     */
    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.doLogin(this.state);
    }

    onRegister(e: React.FormEvent) {
        e.preventDefault();
        this.props.history.push("/register");
    }

    render() {
        return (
            <Form onSubmit={event => this.onSubmit(event)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  onChange={event=>this.setState({email: event.target.value})}
                                  value={this.state.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  onChange={event=>this.setState({password:event.target.value})}
                                  value={this.state.password} />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="dark" type="submit">
                        Sign in
                    </Button>
                    <Button variant="outline-dark"
                            onClick={e => this.onRegister(e)}>
                        Create an account
                    </Button>
                </div>
            </Form>
        );
    }
}
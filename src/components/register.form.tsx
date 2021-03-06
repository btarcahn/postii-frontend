import React from "react";
import { Button, Form } from "react-bootstrap";

import AuthService from "../services/auth.service";
import {RouteComponentProps} from "react-router-dom";

interface RouterProps {
    history: string;
}

type FormProps = RouteComponentProps<RouterProps>;

type FormState = {
    email: string,
    password: string,
    password_confirmation: string
}

export default class RegisterForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: ""
        };
    }

    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (this.state.password !== this.state.password_confirmation) {
            alert("Password and password confirmation are not the same");
            return;
        }
        this.doRegister(this.state);
    }

    private doRegister(formVal: { email: string, password: string, password_confirmation: string }) {
        const { email, password, password_confirmation } = formVal;

        AuthService.register(email, password, password_confirmation)
            .then((response) => {
                switch (response.status) {
                    case 200:
                        alert("Account created, you can now login.");
                        break;
                    default:
                        alert(`Something went wrong: error ${response.status}.`);
                }
            });
    }

    private onLogin(e: React.FormEvent) {
        e.preventDefault();
        this.props.history.push("/login");
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
                                  onChange={event=>this.setState({password: event.target.value})}
                                  value={this.state.password} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control type="password"
                                  onChange={event=>this.setState({password_confirmation: event.target.value})}
                                  value={this.state.password_confirmation} />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="dark" type="submit">
                        Register
                    </Button>
                    <Button variant="outline-dark" type="submit"
                            onClick={e => this.onLogin(e)}>
                        Already registered? Login!
                    </Button>
                </div>
            </Form>
        );
    }

}

import React from "react";
import { Button, Form } from "react-bootstrap";

import AuthService from "../services/auth.service";
import { RouteComponentProps, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../actions/auth";


// interface RouterProps {
//     history: string;
// }

// type FormProps = RouteComponentProps<RouterProps>;
type FormProps = { history: [string],
    dispatch: (func: any) => Promise<any>
}

type FormState = {
    email: string,
    password: string,
    loading: boolean
}

/**
 * The login form component, contains the form and functions to handle login.
 *
 * @version 2.0
 * @author btarcahn
 */
class LoginForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false
        }
    }

    private doLogin() {

        const { dispatch, history } = this.props;

        this.setState({ loading: true });

        dispatch(login(this.state.email, this.state.password))
            .then((response) => {
                // history.push("/profile");
                // window.location.reload();
                switch (response.status) {
                    case 201:
                        alert("Login successful");
                        break;
                    case 422:
                        alert("Invalid login credentials");
                        break;
                }
            })
            .catch(() => {
                this.setState({ loading: false });
            });

        // AuthService.login(email, password)
        //     .then((response) => {
        //         switch (response.status) {
        //             case 201:
        //                 alert("Login successful");
        //                 break;
        //             case 422:
        //                 alert("Invalid login credentials");
        //                 break;
        //         }
        //     });
    }

    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.doLogin();
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

function mapStateToProps(state: any) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return { isLoggedIn, message };
}

export default connect(mapStateToProps)(LoginForm);

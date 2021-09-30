import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import * as Yup from "yup";
import AuthService from "../services/auth.service"

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

        console.log("Login class created.");
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

        const initialValues = {
            email: "",
            password: ""
        }

        return (
            <div>
                <Grid container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
                    <Grid item xs={12} sm={6}>
                        <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
                            <TextField id="email" label="email" margin="normal" type="email" />
                            <TextField id="password" label="password" margin="normal" type="password"/>
                            <div style={{ height: 20 }} />
                            <Button color="primary"
                                    type="submit"
                                    variant="contained"
                                    onClick={ () => { alert("Login is being implemented!"); } }>
                                Login
                            </Button>
                            <Button onClick={ () => { console.log("Sign up clicked!"); } }>Get an account</Button>
                        </div>
                        <div />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const LoginComponent: React.FC = () => {
    return (
        <div>
            <Grid container style={ { minHeight: '20vh', maxHeight: '50vh' } }>
                <Grid item xs={12} sm={6}>
                    <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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

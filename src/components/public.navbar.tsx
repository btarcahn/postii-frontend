import {Component} from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Router, Switch, Route, Link } from "react-router-dom";

type Props = { history: any };
type State = { currentUser: any };

export default class PublicNavbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { currentUser: undefined };
    }

    render() {
        return (
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">postii</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">What's this?</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Container>
        );
    }
}

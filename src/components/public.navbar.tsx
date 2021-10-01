import {Component} from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

export default class PublicNavbar extends Component {
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

import React from "react";
import {Container, Image} from "react-bootstrap";

const ADMIN_EMAIL = 'bach.tran@employmenthero.com';

type Props = {

};

type State = {
    message: string,
    triggered_by: string
};

export const NilComponent: React.FC<Props> = () => (
    <Container style={{ maxWidth: '75%', maxHeight: '75%' }}>
        <h3>Oops! Something happened!</h3>
        <Container style={{ maxHeight: '75%', maxWidth: '75%' }}>
            <Image src="https://img.freepik.com/free-vector/404-error-with-character-error-design-template-website_114341-24.jpg?size=626&ext=jpg"
                   fluid alt="Error 404 image" />
        </Container>
        You are seeing this because we've messed up somewhere... <br/>
        Please contact { ADMIN_EMAIL }for support.
    </Container>
    );

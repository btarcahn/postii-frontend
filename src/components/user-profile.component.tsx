import React from "react";

import UserService from "../services/user.service";

type State = {
    email: string,
    role: string,
    picture?: string,
    member_since: string
}

export default class UserProfile extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state= {
            email: "",
            role: "",
            picture: "",
            member_since: ""
        }
    }

    componentDidMount() {
        //TODO find a way to get JWT here
    }
}

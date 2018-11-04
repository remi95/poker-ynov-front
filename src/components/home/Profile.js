import React, { Component } from 'react';
import Stats from "./Stats";
import UserInfo from "./UserInfo";

class Profile extends Component {

    render() {
        return (
            <div>
                <UserInfo />
                <Stats />
            </div>
        )
    }
}

export default Profile;
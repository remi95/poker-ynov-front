import React, { Component } from 'react';
import StatModal from "./StatModal";
import UserInfo from "./UserInfo";

class Profile extends Component {

    render() {
        return (
            <div>
                <UserInfo />
                <StatModal />
            </div>
        )
    }
}

export default Profile;
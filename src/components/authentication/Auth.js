import React, { Component } from 'react';
import {Title} from "../general/Title";
import {Alert} from "../general/Alert";
import AuthForm from "./AuthForm";

class Auth extends Component {

    render () {
        return (
            <div>
                {/* TODO: Check if alert message */}
                <Alert />

                <Title />
                <img src="" alt=""/>

                <AuthForm />
            </div>
        )
    }
}

export default Auth;
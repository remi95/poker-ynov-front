import React, { Component } from 'react';
import AuthForm from "./AuthForm";
import logo from "../../logo.png";

class Auth extends Component {

    render () {
        return (
            <div className="container h-100">
                <div className="row">
                    <div className="column h-100 d-flex align-items-center">
                        <img src={ logo } alt="poker ynov team logo"/>
                    </div>
                    <div className="column h-100 d-flex align-items-center">
                        <AuthForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;
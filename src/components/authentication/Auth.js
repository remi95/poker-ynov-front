import React, { Component } from 'react';
import {Title} from "../general/Title";
import AuthForm from "./AuthForm";

class Auth extends Component {

    render () {
        return (
            <div className="container h-100">
                <div className="row">
                    <div className="column h-100 d-flex align-items-center">
                        <Title />
                        <img src="" alt=""/>
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
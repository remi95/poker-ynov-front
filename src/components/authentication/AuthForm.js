import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Signup from "../form/Signup";
import Login from "../form/Login";

class AuthForm extends Component {

    render() {
        return (
            <div className="container">
                <div className="login-btn-container">
                    <NavLink to={'/login'} className="button button-outline btn-login">Connexion</NavLink>
                    <NavLink to={'/signup'} className="button button-outline btn-signup">Inscription</NavLink>
                </div>
                <Route path={'/signup'}
                       component={ Signup } />

                <Route path={'/login'}
                       component={ Login } />
            </div>
        )
    }
}

export default AuthForm;
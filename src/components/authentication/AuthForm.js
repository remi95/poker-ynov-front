import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Signup from "../form/Signup";
import Login from "../form/Login";

class AuthForm extends Component {

    render() {
        return (
            <div className="container">
                <NavLink to={'/login'} className="button button-outline">Connexion</NavLink>
                <NavLink to={'/signup'} className="button button-outline">Inscription</NavLink>

                <Route path={'/signup'}
                       component={ Signup } />

                <Route path={'/login'}
                       component={ Login } />
            </div>
        )
    }
}

export default AuthForm;
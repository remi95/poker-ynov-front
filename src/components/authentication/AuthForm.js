import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Signup from "../form/Signup";
import Login from "../form/Login";

class AuthForm extends Component {

    render() {
        return (
            <div>
                <NavLink to={'/login'}>Connexion</NavLink>
                <NavLink to={'/signup'}>Inscription</NavLink>

                <Route path={'/signup'}
                       component={ Signup } />

                <Route path={'/login'}
                       component={ Login } />
            </div>
        )
    }
}

export default AuthForm;
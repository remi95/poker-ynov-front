import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Auth from "./components/authentication/Auth";
import Menu from "./components/home/Menu";
import Game from "./components/game/Game";
import Alert from "./components/general/Alert";
import PrivateRoute from "./components/PrivateRoute";
import {authenticate} from "./helpers/authentication";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./components/form/ResetPassword";
import './styles/App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        authenticate(props.location);
    }

    render() {
        return (
            <div>
                <Alert />
                <PublicRoute path="/(login|signup)" component={ Auth } />
                <PublicRoute path="/password-reset/:token" component={ ResetPassword } />
                <PrivateRoute path="/(|profile)" component={ Menu } />
                <PrivateRoute path="/game" component={ Game } />
            </div>
        );
    }
}

export default withRouter(App);

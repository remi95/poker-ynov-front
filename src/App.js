import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Auth from "./components/authentication/Auth";
import Menu from "./components/home/Menu";
import Game from "./components/game/Game";
import Alert from "./components/general/Alert";
import PrivateRoute from "./components/PrivateRoute";
import {authenticate} from "./helpers/authentication";
import store from "./store";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./components/form/ResetPassword";
import 'milligram';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        authenticate(props.location);
    }

    render() {
        return (
            <div>
                {/* TODO: remove it, just an indicator for now */}
                {store.getState().userReducer.token ? 'CONNECTED' : ''}
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

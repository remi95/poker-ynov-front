import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import './App.css';
import Auth from "./components/authentication/Auth";
import Menu from "./components/home/Menu";
import Game from "./components/game/Game";
import Alert from "./components/general/Alert";
import PrivateRoute from "./components/PrivateRoute";
import {authenticate} from "./helpers/authentication";
import store from "./store";
import Stat from "./components/stat/Stat";
import Modal from 'react-responsive-modal';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        authenticate(props.location);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                {/* TODO: remove it, just an indicator for now */}
                {store.getState().userReducer.token ? 'CONNECTED' : ''}
                <button onClick={this.onOpenModal}>Open modal</button>

                <Modal open={ open } onClose={ this.onCloseModal } center>
                    <Stat />
                </Modal>

                <Alert />
                <Route path="/(login|signup)" component={ Auth } />
                <PrivateRoute path="/(|profile)" component={ Menu } />
                <PrivateRoute path="/game" component={ Game } />
            </div>
        );
    }
}

export default withRouter(App);

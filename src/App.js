import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Auth from "./components/authentication/Auth";
import Menu from "./components/home/Menu";
import Game from "./components/game/Game";

class App extends Component {
    render() {
        return (
            <div>
                <Route path="/(login|signup)" component={ Auth } />
                <Route path="/(|profile)" component={ Menu } />
                <Route path="/game" component={ Game } />
            </div>
        );
    }
}

export default App;

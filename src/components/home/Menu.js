import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Profile from "./Profile";
import {Title} from "../general/Title";

class Menu extends Component {

    render() {
        return (
            <div>
                <Title />

                <Link to={'/logout'}>Déconnexion</Link>
                <Link to={'/game'}>Rejoindre une partie</Link>
                <Link to={'/profile'}>Mon profil</Link>

                <Route path={'/profile'} component={ Profile } />
            </div>
        )
    }
}

export default Menu;
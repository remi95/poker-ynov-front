import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Profile from "./Profile";
import {Title} from "../general/Title";
import {logoutAndRedirect} from "../../actions/authAction";
import connect from "react-redux/es/connect/connect";

class Menu extends Component {

    render() {
        return (
            <div>
                <Title />

                <button onClick={this.props.logout}>Déconnexion</button>

                <Link to={'/game'}>Rejoindre une partie</Link>
                <Link to={'/profile'}>Mon profil</Link>

                <Route path={'/profile'} component={ Profile } />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (alert) => dispatch(logoutAndRedirect(alert))
    }
};

export default connect(null, mapDispatchToProps)(Menu);
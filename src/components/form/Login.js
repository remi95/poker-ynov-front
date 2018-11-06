import React, { Component } from 'react';
import { connect } from "react-redux";
import {checkUser} from "../../actions/authAction";
import {pushAlert} from "../../actions/alertAction";
import {alert} from "../../helpers/global";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
        };
    }

    inputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    submit = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            this.props.login(this.state)
        }
        else {
            this.props.alert(alert('error', 'Veuillez remplir tous les champs'))
        }
    };

    render() {
        return (
            <form onSubmit={ this.submit }>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={ this.inputChange } />

                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" onChange={ this.inputChange } />

                <input type="submit" value={'Se connecter'} />
            </form>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        userReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(checkUser(user)),
        alert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
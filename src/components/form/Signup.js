import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postUser} from "../../actions/authAction";
import {alert} from "../../helpers/global";
import {pushAlert} from "../../actions/alertAction";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                username: '',
                birthdate: '',
                password: '',
                confirmPassword: '',
            },
            error: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            },
            error: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { user } = this.state;
        if (user.email && user.username && user.birthdate && user.password && user.confirmPassword) {
            this.props.register(user);
        }
        else {
            this.props.alert(alert('error', 'Veuillez remplir tous les champs'))
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Saisissez votre email" onChange={ this.handleChange } />
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" placeholder="Saisissez un nom d'utilisateur" onChange={ this.handleChange } />
                    <label>Date de naissance</label>
                    <input type="date" placeholder="Date de naissance" name="birthdate" onChange={ this.handleChange } />
                    <label>Mot de passe</label>
                    <input type="password" placeholder="Saisissez un mot de passe" name="password" onChange={ this.handleChange } />
                    <label>Retaper le mot de passe</label>
                    <input type="password" placeholder="Retapez le mot de passe" name="confirmPassword" onChange={ this.handleChange } />
                    <button type="submit">Envoyer</button>
                </form>

                { this.props.userReducer.loading ? <span>Loading</span> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        userReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(postUser(user)),
        alert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
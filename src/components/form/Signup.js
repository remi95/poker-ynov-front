import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/registrationAction";

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
            this.props.registerUser(user);
        }
        else {
            this.setState({
                ...this.state,
                error: true
            })
        }
    }

    render() {

        const { error, isLoged, isLoading } = this.props.registrationReducer;

        return (
            <div>
                { this.state.error ? <span>Tous les champs doivent être remplis</span> : null }

                { error ? <span>{ error }</span> : null }

                { isLoged ? <span>Inscription réussi</span> : null }

                <form onSubmit={ this.handleSubmit }>
                    <input type="email" name="email" placeholder="email" onChange={ this.handleChange } />
                    <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={ this.handleChange } />
                    <input type="date" placeholder="Date de naissance" name="birthdate" onChange={ this.handleChange } />
                    <input type="password" placeholder="Mot de passe" name="password" onChange={ this.handleChange } />
                    <input type="password" placeholder="Retapez le mot de passe" name="confirmPassword" onChange={ this.handleChange } />
                    <button type="submit">Envoyer</button>
                </form>

                { isLoading ? <span>Loading</span> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ registrationReducer }) => {
    return {
        registrationReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(registerUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
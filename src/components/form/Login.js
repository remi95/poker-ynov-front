import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from "../../actions/authAction";

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
        // TODO: throw alert message.
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
        login: (user) => dispatch(login(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // this.props.getUser(e.target.value);
        const { name, value } = e.target;
        console.log({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.props.userReducer.user);
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit } >
                <input type="mail" name="mail" placeholder="Mail" onChange={ this.handleChange } />
                <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={ this.handleChange } />
                <input type="date" placeholder="Date de naissance" name="birthdate" onChange={ this.handleChange } />
                <input type="password" placeholder="Mot de passe" name="password" onChange={ this.handleChange } />
                <input type="password" placeholder="Retapez le mot de passe" name="confirmPassword" onChange={ this.handleChange } />
                <button type="submit">Envoyer</button>
            </form>
        )
    }
}

export default Signup;
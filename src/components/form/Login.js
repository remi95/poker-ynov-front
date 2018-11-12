import React, { Component } from 'react';
import { connect } from "react-redux";
import {checkUser} from "../../actions/authAction";
import {pushAlert} from "../../actions/alertAction";
import {alert} from "../../helpers/global";
import ForgetPassword from "./ForgetPassword";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: null,
                password: null,
            },
            openModal: false,
        };
    }

    toggleModal = () => {
        this.setState({ openModal: !this.state.openModal })
    };

    inputChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    };

    submit = (e) => {
        e.preventDefault();
        if (this.state.form.email && this.state.form.password) {
            this.props.login(this.state.form)
        }
        else {
            this.props.alert(alert('error', 'Veuillez remplir tous les champs'))
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={ this.submit }>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={ this.inputChange } />

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" onChange={ this.inputChange } />

                    <input type="submit" value={'Se connecter'} />
                </form>

                <button onClick={this.toggleModal}>Mot de passe oublié</button>

                <ForgetPassword open={this.state.openModal}
                                closeModal={this.toggleModal}
                                alert={this.props.alert} />
            </div>

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
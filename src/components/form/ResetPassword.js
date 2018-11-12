import React, { Component } from 'react';
import {alert} from "../../helpers/global";
import client from "../../clients/apiClient";
import {pushAlert} from "../../actions/alertAction";
import connect from "react-redux/es/connect/connect";
import history from "../../helpers/history";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.token = props.match.params.token;

        this.state = {
            password: null,
            confirmPassword: null,
        }
    }

    inputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submit = async (e) => {
        e.preventDefault();
        if (this.state.password && this.state.confirmPassword) {
            const request = await client.post(`/password-reset/${this.token}`, {
                newPassword: this.state.password,
                newPasswordVerify: this.state.confirmPassword,
            });

            if (request.status) {
                this.props.alert(alert('success', 'Votre mot de passe a bien été réinitialisé.'));
                history.push('/login')
            }
            else {
                this.props.alert(alert('error', request.data.message));
            }
        }
        else {
            this.props.alert(alert('error', 'Veuillez remplir tous les champs'))
        }
    };

    render() {
        return (
            <form onSubmit={this.submit}>
                <label htmlFor="password">Nouveau mot de passe</label>
                <input type="password" name="password" onChange={this.inputChange}/>

                <label htmlFor="confirmPassword">Confirmez le nouveau mot de passe</label>
                <input type="password" name="confirmPassword" onChange={this.inputChange}/>

                <input type="submit" value="Valider"/>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(null, mapDispatchToProps)(ResetPassword);
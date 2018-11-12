import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {alert} from "../../helpers/global";
import client from "../../clients/apiClient";

class ForgetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
        }
    }

    inputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submit = async (e) => {
        e.preventDefault();
        if (this.state.email) {
            const request = await client.post('/forget-password', this.state);

            if (request.status) {
                this.props.alert(alert('success', 'Vous allez recevoir un email sur l\'adresse indiquée, contenant toutes les informations pour réinitialiser votre mot de passe.'));
            }
            else {
                this.props.alert(alert('error', request.data.message));
            }
        }
        else {
            this.props.alert(alert('error', 'Veuillez remplir tous les champs'))
        }

        this.props.closeModal()
    };

    render() {
        return(
            <Modal open={this.props.open} onClose={this.props.closeModal}>
                <form onSubmit={this.submit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={this.inputChange}/>

                    <input type="submit" value="Valider" />
                </form>
            </Modal>
        )
    }
}

export default ForgetPassword;
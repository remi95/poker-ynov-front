import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Title} from "../general/Title";
import {logoutAndRedirect} from "../../actions/authAction";
import Stats from "./Stats";
import Modal from "react-responsive-modal";
import {closeModal, openModal} from "../../actions/modalAction";
import { connect } from 'react-redux';

class Menu extends Component {

    render() {
        return (
            <div>
                <Title />

                <button onClick={this.props.logout}>Déconnexion</button>

                <Link to={'/game'}>Rejoindre une partie</Link>
                <button onClick={ () => this.props.openModal()}>Mon profil</button>

                <Modal open={ this.props.modalReducer.isOpen } onClose={ () => this.props.closeModal() } center>
                    <Stats />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ modalReducer }) => {
    return {
        modalReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        logout: (alert) => dispatch(logoutAndRedirect(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

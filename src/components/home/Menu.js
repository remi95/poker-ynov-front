import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Stats from "./Stats";
import Modal from "react-responsive-modal";
import {closeModal, openModal} from "../../actions/modalAction";
import { connect } from 'react-redux';
import logo from "../../logo.png";

class Menu extends Component {

    render() {
        return (
            <div className="container">

                <div className="h-50 d-flex align-items-center justify-center">
                    <img src={logo} alt="logo poker ynov"/>
                </div>

                <div className="h-50 d-flex align-items-center justify-start flex-column">
                    <Link className="button" to={'/game'}>Rejoindre une partie</Link>

                    <button className="button button-outline" onClick={ () => this.props.openModal() }>Mon profil</button>

                    <Modal open={ this.props.modalReducer.isOpen } onClose={ () => this.props.closeModal() } center>
                        <Stats />
                    </Modal>
                </div>
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
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

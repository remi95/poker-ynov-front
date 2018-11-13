import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Stats from "./Stats";
import Modal from "react-responsive-modal";
import {closeModal, openModal} from "../../actions/modalAction";
import { connect } from 'react-redux';
import logo from "../../logo.png";
import spade from "../../images/spade.png";

class Menu extends Component {

    render() {
        return (
            <div className="bg-img-poker d-flex align-items-center">
                <div className="join-game-container d-flex align-items-center justify-center flex-column">

                    <div className="d-flex justify-center align-items-center flex-column left-spade">
                        <div className="card-value">A</div>
                        <img src={ spade } alt="spade card" />
                    </div>

                    <img src={logo} alt="logo poker ynov"/>
                    <div className="join-game-button-container d-flex align-items-center justify-start flex-column">
                        <Link className="button btn-join-game" to={'/game'}>Rejoindre une partie</Link>

                        <button className="button button-outline btn-profile" onClick={ () => this.props.openModal() }>Mon profil</button>

                        <Modal open={ this.props.modalReducer.isOpen } onClose={ () => this.props.closeModal() } center>
                            <Stats />
                        </Modal>

                        <div className="d-flex justify-center align-items-center flex-column right-spade">
                            <div className="card-value">A</div>
                            <img src={ spade } alt="spade card" />
                        </div>
                    </div>
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

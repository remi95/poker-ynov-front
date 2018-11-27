import React, { Component } from 'react';
import Stats from "./Stats";
import Modal from "react-responsive-modal";
import {closeModal, openModal} from "../../actions/modalAction";
import { connect } from 'react-redux';
import logo from "../../logo.png";
import spade from "../../images/spade.png";
import {Loading} from "../general/Loading";
import history from "../../helpers/history";
import {cantJoinGame, getHand, init} from "../../actions/gameAction";
import socketClient from "../../clients/socketClient";
import {logoutAndRedirect} from "../../actions/authAction";
import logout from "../../images/logout.svg";

class Menu extends Component {

    constructor (props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    joinGame = () => {
        socketClient.io.socket.post('/user/join', { userId: this.props.userReducer.user.id }, (data, jwRes) => {
            if (jwRes.statusCode !== 400) {
                this.setState({ loading: true })
            }
            else {
                this.props.cantJoinGame(`You can't join game, ${data.message}`);
            }
        }
        );
    };

    startGame = () => {
        socketClient.io.socket.on('gameStart', (game) => {
            this.props.init(game);

            socketClient.io.socket.post(`/user/${this.props.userReducer.user.id}/cards`, {
                gameId: game.id
            }, async (userCards) => {
                await this.props.getHand(userCards);
                history.push('/game')
            });
        });
    };

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
                        <button className="button btn-join-game" onClick={this.joinGame}>Rejoindre une partie</button>

                        <button className="button button-outline btn-profile" onClick={ () => this.props.openModal() }>Mes statistiques</button>

                        <button className="button button-outline btn-logout" onClick={ () => this.props.logout() }><img src={ logout } alt="logout"/></button>

                        <Modal open={ this.props.modalReducer.isOpen } onClose={ () => this.props.closeModal() } center>
                            <Stats />
                        </Modal>

                        <div className="d-flex justify-center align-items-center flex-column right-spade">
                            <div className="card-value">A</div>
                            <img src={ spade } alt="spade card" />
                        </div>
                    </div>

                    {
                        this.state.loading
                            ? <Loading message='En attente de joueurs...' />
                            : null
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.startGame()
    }
}

const mapStateToProps = ({ modalReducer, userReducer }) => {
    return {
        modalReducer, userReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        init: (data) => dispatch(init(data)),
        getHand: (data) => dispatch(getHand(data)),
        logout: (alert) => dispatch(logoutAndRedirect(alert)),
        cantJoinGame: (alert) => dispatch(cantJoinGame(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

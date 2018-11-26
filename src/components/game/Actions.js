import React, {Component} from 'react';
import bet from '../../images/bet.png';
import sleeping from '../../images/sleeping.png';
import check from '../../images/check.png';
import connect from "react-redux/es/connect/connect";
import socketClient from "../../clients/socketClient";

class Actions extends Component {

    constructor (props) {
        super(props);

        this.state = {
            cursorBet: this.props.gameReducer.bigBlind,
            minBet: this.props.gameReducer.bigBlind,
        }
    }

    updateTooltip = (e) => {
        this.setState({cursorBet: e.target.value})
    };

    actionHoverEffect = () => {
        const actionsBlock = document.getElementById('btn-actions');
        actionsBlock.classList.toggle('above');
    };

    sendAction = (e) => {
        const action = e.target.getAttribute('data-action');
        let value = null;

        if (action === 'BET') {
            value = this.state.cursorBet;
        }
        else if (action === 'CALL') {

        }

        socketClient.io.socket.post('/action', {
            gameId: this.props.gameReducer.id,
            userId: this.props.userReducer.user.id,
            actionType: action,
            value: value,
        });
    };

    render () {
        let maxBet = 0;

        for (let player of this.props.gameReducer.players) {
            if (this.props.userReducer.user.id === player.user.id) {
                maxBet = player.chips;
            }
        }

        const game = this.props.gameReducer;
        const user = this.props.userReducer.user;

        return (
            <div id={'actions'}>
                <div id={'btn-actions'} className={game.playingPlayerId === user.id ? '' : 'disable'}>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={this.sendAction}
                         data-action='FOLD'>
                        <img src={sleeping} alt=""/>Se coucher
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={this.sendAction}
                         data-action='CALL'>
                        <img src={check} alt=""/>
                        {
                            game.playingPlayerCallValue
                                ? 'Suivre ' + game.playingPlayerCallValue + '€'
                                : 'Check'
                        }
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={this.sendAction}
                         data-action='BET'>
                        <img src={bet} alt=""/> Miser {this.state.cursorBet}€
                    </div>
                </div>

                <div id={'cursor'} className={game.playingPlayerId === user.id ? '' : 'hide'}>
                    <div className={'tooltip'}>{this.state.cursorBet}€</div>
                    <input type="range"
                           step={game.smallBlind}
                           min={this.state.minBet}
                           max={maxBet}
                           onChange={this.updateTooltip}/>
                </div>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props && this.props.gameReducer.playingPlayerId === this.props.userReducer.user.id) {

            const game = this.props.gameReducer;
            const cursor = document.querySelector('input[type=range]');
            let playerChips = 0;

            for (let player of this.props.gameReducer.players) {
                if (player.user.id === game.playingPlayerId) {
                    playerChips = player.chips;
                }
            }

            if (game.playingPlayerCallValue !== 0) {
                let minBet = (game.playingPlayerCallValue * 2 > playerChips)
                    ? playerChips
                    : game.playingPlayerCallValue * 2;

                cursor.value = minBet;
                this.setState({
                    cursorBet: minBet,
                    minBet,
                })
            }
            else {
                cursor.value = game.bigBlind;
                this.setState({
                    cursorBet: game.bigBlind,
                    minBet: game.bigBlind,
                })
            }
        }
    }
}

const mapStateToProps = ({ userReducer, gameReducer }) => {
    return {
        userReducer, gameReducer
    }
};

export default connect(mapStateToProps, null)(Actions);


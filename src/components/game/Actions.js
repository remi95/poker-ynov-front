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
            defaultAction: 'CALL',
        };

        this.timer = null;
    }

    updateTooltip = (e) => {
        this.setState({cursorBet: e.target.value})
    };

    actionHoverEffect = () => {
        const actionsBlock = document.getElementById('btn-actions');
        actionsBlock.classList.toggle('above');
    };

    sendAction = (action = null) => {
        let value = null;

        if (action === null) {
            action = this.state.defaultAction
        }

        if (action === 'BET') {
            value = this.state.cursorBet;
        }

        clearTimeout(this.timer);

        socketClient.io.socket.post('/action', {
            gameId: this.props.gameReducer.id,
            userId: this.props.userReducer.user.id,
            actionType: action,
            value: value,
        });
    };

    setDefaultAction = () => {
        let defaultAction = 'CALL';
        if (this.props.gameReducer.playingPlayerCallValue) {
            defaultAction = 'FOLD';
        }

        this.setState({ defaultAction })
    };

    startTimer = () => {
        this.setDefaultAction();
        clearTimeout(this.timer);

        if (!this.props.gameReducer.showingResults) {
            this.timer = setTimeout(() => {
                this.sendAction()
            }, 10000);
        }
    };

    render () {
        let playerChips = 0;

        for (let player of this.props.gameReducer.players) {
            if (this.props.userReducer.user.id === player.user.id) {
                playerChips = player.chips;
            }
        }

        const game = this.props.gameReducer;
        const user = this.props.userReducer.user;
        const activePlayer = game.playingPlayerId === user.id;
        const canRaise = playerChips > game.playingPlayerCallValue;

        return (
            <div id={'actions'}>
                <div id={'btn-actions'} className={activePlayer ? '' : 'disable'}>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={activePlayer ? () => this.sendAction('FOLD') : null} >
                        <img src={sleeping} alt=""/>Se coucher
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={activePlayer ? () => this.sendAction('CALL') : null} >
                        <img src={check} alt=""/>
                        {
                            game.playingPlayerCallValue
                                ? 'Suivre ' + (game.playingPlayerCallValue > playerChips ? 'TAPIS' : game.playingPlayerCallValue + '€')
                                : 'Check'
                        }
                    </div>
                    <div className={'action ' + (canRaise ? '' : 'hide')}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={activePlayer ? () => this.sendAction('BET') : null} >
                        <img src={bet} alt=""/>
                        {
                            this.state.cursorBet == playerChips
                                ? 'TAPIS'
                                : `Miser ${this.state.cursorBet}€`
                        }
                    </div>
                </div>

                <div id={'cursor'} className={activePlayer && canRaise ? '' : 'hide'}>
                    <div className={'tooltip'}>
                        {
                            this.state.cursorBet == playerChips
                                ? 'TAPIS'
                                : this.state.cursorBet + '€'
                        }
                    </div>
                    <input type="range"
                           step={game.smallBlind}
                           min={this.state.minBet}
                           max={playerChips}
                           onChange={this.updateTooltip}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props && this.props.gameReducer.playingPlayerId === this.props.userReducer.user.id) {

            this.startTimer();

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


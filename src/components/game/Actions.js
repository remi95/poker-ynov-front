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

        let game = this.props.gameReducer;

        return (
            <div id={'actions'}>
                <div id={'btn-actions'}>
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
                        <img src={check} alt=""/>Check / Suivre
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={this.sendAction}
                         data-action='BET'>
                        <img src={bet} alt=""/> Miser {this.state.cursorBet}€
                    </div>
                </div>

                <div id={'cursor'}>
                    <div className={'tooltip'}>{this.state.cursorBet}€</div>
                    <input type="range"
                           step={game.bigBlind}
                           min={game.playingPlayerCallValue ? game.playingPlayerCallValue * 2 : game.bigBlind}
                           max={maxBet}
                           onChange={this.updateTooltip}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ userReducer, gameReducer }) => {
    return {
        userReducer, gameReducer
    }
};

export default connect(mapStateToProps, null)(Actions);


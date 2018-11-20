import React, {Component} from 'react';
import bet from '../../images/bet.png';
import sleeping from '../../images/sleeping.png';
import check from '../../images/check.png';
import connect from "react-redux/es/connect/connect";

class Actions extends Component {

    constructor (props) {
        super(props);

        this.state = {
            currentBet: this.props.gameReducer.bigBlind,
        }
    }

    updateTooltip = (e) => {
        this.setState({currentBet: e.target.value})
    };

    actionHoverEffect = () => {
        const actionsBlock = document.getElementById('btn-actions');
        actionsBlock.classList.toggle('above');
    };

    render () {
        let maxBet = 0;

        for (let player of this.props.gameReducer.players) {
            if (this.props.userReducer.user.id === player.id) {
                maxBet = player.money;
            }
        }

        let game = this.props.gameReducer;

        return (
            <div id={'actions'}>
                <div id={'btn-actions'}>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}
                         onClick={this.props.fold}>
                        <img src={sleeping} alt=""/>Se coucher
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}>
                        <img src={check} alt=""/>Check / Suivre
                    </div>
                    <div className={'action'}
                         onMouseLeave={this.actionHoverEffect}
                         onMouseEnter={this.actionHoverEffect}>
                        <img src={bet} alt=""/> Miser {this.state.currentBet}€
                    </div>
                </div>

                <div id={'cursor'}>
                    <div className={'tooltip'}>{this.state.currentBet}€</div>
                    <input type="range"
                           step={game.bigBlind}
                           min={game.bigBlind}
                           max={maxBet}
                           onChange={this.updateTooltip} />
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


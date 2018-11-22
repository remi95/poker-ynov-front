import React, {Component} from 'react';
import {PlayerInfo} from "./PlayerInfo";
import Hand from "./Hand";
import {Bet} from "./Bet";
import {ButtonRole} from "./ButtonRole";
import {HiddenHand} from "./HiddenHand";
import connect from "react-redux/es/connect/connect";

class Player extends Component {

    render () {
        let { player } = this.props;
        let { user } = player;

        return (
            <div className={'player player-' + player.position}>

                {
                    user.id === this.props.gameReducer.playingPlayerId
                        ? 'A MOI'
                        : null
                }

                <PlayerInfo username={user.username} money={player.chips} />
                {
                    this.props.userReducer.user.id === user.id
                        ?   <Hand />
                        :   <HiddenHand position={player.position} />
                }
                <div className={'d-flex btn-chips'}>
                    <Bet bet={player.currentBet} />
                    {/*<ButtonRole role={player.role} />*/}
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

export default connect(mapStateToProps, null)(Player);
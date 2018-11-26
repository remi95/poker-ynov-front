import React, {Component} from 'react';
import PlayerInfo from "./PlayerInfo";
import Hand from "./Hand";
import {Bet} from "./Bet";
import {ButtonRole} from "./ButtonRole";
import connect from "react-redux/es/connect/connect";

class Player extends Component {

    render () {
        let { player } = this.props;
        let { user } = player;

        return (
            <div className={'player player-' + player.position + (player.hasDropped ? ' fold' : '')}>
                <PlayerInfo
                    username={user.username}
                    money={player.chips}
                    active={user.id === this.props.gameReducer.playingPlayerId} />

                <Hand player={user} position={player.position}/>

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
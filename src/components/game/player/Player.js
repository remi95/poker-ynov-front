import React, {Component} from 'react';
import {PlayerInfo} from "./PlayerInfo";
import Hand from "./Hand";
import {Bet} from "./Bet";
import {ButtonRole} from "./ButtonRole";
import {HiddenHand} from "./HiddenHand";
import connect from "react-redux/es/connect/connect";

class Player extends Component {

    render () {
        let { user } = this.props;

        return (
            <div className={'player player-' + user.position}>
                <PlayerInfo username={user.username} money={user.money} />
                {
                    this.props.userReducer.user.id === user.id
                        ?   <Hand />
                        :   <HiddenHand position={user.position} />
                }
                <div className={'d-flex btn-chips'}>
                    <Bet bet={user.bet} />
                    <ButtonRole role={user.role} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, null)(Player);
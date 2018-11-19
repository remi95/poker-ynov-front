import React from 'react';
import {PlayerInfo} from "./PlayerInfo";
import Hand from "./Hand";
import {Bet} from "./Bet";
import {ButtonRole} from "./ButtonRole";
import store from "../../../store";
import {HiddenHand} from "./HiddenHand";

export const Player = (props) => {

    const { user } = props;

    return (
        <div className={'player player-' + user.position}>
            <PlayerInfo username={user.username} money={user.money} />
            {
                store.getState().userReducer.user.id === user.id
                    ? <Hand />
                    : <HiddenHand position={user.position} />
            }
            <div className={'d-flex btn-chips'}>
                <Bet bet={user.bet} />
                <ButtonRole role={user.role} />
            </div>
        </div>
    )
};
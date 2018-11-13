import React from 'react';
import {PlayerInfo} from "./PlayerInfo";
import Hand from "./Hand";
import {Bet} from "./Bet";
import {ButtonRole} from "./ButtonRole";
import store from "../../../store";

export const Player = (props) => {

    const { user } = props;

    return (
        <div className={'player'}>
            <PlayerInfo username={user.username} money={user.money} />
            {
                store.getState().userReducer.user.id === user.id
                    ? <Hand />
                    : null
            }
            <div>
                <Bet bet={user.bet} />
                <ButtonRole role={user.role} />
            </div>
        </div>
    )
};
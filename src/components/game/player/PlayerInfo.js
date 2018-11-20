import React from 'react';

export const PlayerInfo = (props) => {

    return (
        <div className={'player-info text-center'}>
            <div className={'username'}>{props.username}</div>
            <span className={'money'}>{props.money} €</span>
        </div>
    )
};
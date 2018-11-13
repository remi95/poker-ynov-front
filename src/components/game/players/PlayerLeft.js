import React from 'react';

export const PlayerLeft = (props) => {

    return (
        <div className={'player-left'}>
            {props.user.username}
        </div>
    )
};
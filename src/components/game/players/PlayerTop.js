import React from 'react';

export const PlayerTop = (props) => {

    return (
        <div className={'player-top'}>
            {props.user.username}
        </div>
    )
};
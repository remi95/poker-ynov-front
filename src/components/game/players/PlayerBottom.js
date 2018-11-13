import React from 'react';

export const PlayerBottom = (props) => {

    return (
        <div className={'player-bottom'}>
            {props.user.username}
        </div>
    )
};
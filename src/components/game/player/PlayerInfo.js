import React from 'react';

export const PlayerInfo = (props) => {

    return (
        <div>
            <strong>{props.username}</strong>
            <span>{props.money} €</span>
        </div>
    )
};
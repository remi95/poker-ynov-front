import React from 'react';

export const ButtonRole = (props) => {

    return (
        <div>
            {
                props.role
                    ? props.role
                    : null
            }
        </div>
    )
};
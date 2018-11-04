import React from 'react';

export const Alert = (props) => {

        return (
            <div className={ 'alert' }>
                { props.message }
            </div>
        )
};
import React from 'react';
import loading from '../../images/loading.png';

export const Loading = (props) => {

    return (
        <div className="loading">
            <img src={loading} alt="loading"/>
            <p>{ props.message }</p>
        </div>
    )
};
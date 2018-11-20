import React from 'react';
import {Card} from "../Card";

export const HiddenHand = (props) => {

    return (
        <div className={'hand d-flex justify-around pos-' + props.position}>
            <Card hidden={true} />
            <Card hidden={true} />
        </div>
    )
};
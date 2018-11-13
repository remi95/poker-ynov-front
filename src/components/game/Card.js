import React from 'react';
import {getCardSymbol} from "../../helpers/game";

export const Card = (props) => {

    return (
        <div>
            {props.card.value}
            <img src={getCardSymbol(props.card.color)} alt=""/>
            {props.card.value}
        </div>
    )
};
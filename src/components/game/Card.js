import React from 'react';
import {getCardSymbol} from "../../helpers/game";

export const Card = (props) => {

    const redColors = ['HEART', 'DIAMOND'];

    return (
        <div>
        {
            props.hidden
            ?
                <div className="card hidden">PY</div>
            :
                <div className={'card ' + (redColors.includes(props.card.color) ? 'text-red' : '')}>
                    <span>{props.card.value}</span>
                    <img src={getCardSymbol(props.card.color)} alt=""/>
                    <span>{props.card.value}</span>
                </div>
        }
        </div>
    )
};
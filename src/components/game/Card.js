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
                <div className={'card ' + (redColors.includes(props.card.suit) ? 'text-red' : '')}>
                    <span>{props.card.rank}</span>
                    <img src={getCardSymbol(props.card.suit)} alt=""/>
                    <span>{props.card.rank}</span>
                </div>
        }
        </div>
    )
};
import React from 'react';
import {Card} from "./Card";

export const CommonCards = (props) => {

    return (
        <div>
            {
                props.cards.map(card =>
                    card.value !== null && card.color !== null
                        ? <Card key={card.value + card.color} card={card} />
                        : null
                )
            }
        </div>
    )
};
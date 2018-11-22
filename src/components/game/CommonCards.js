import React from 'react';
import {Card} from "./Card";

export const CommonCards = (props) => {

    return (
        <div id={'common-cards'} className={'cards'}>
            {
                props.cards.map(card =>
                    card.rank !== null && card.suit !== null
                        ? <Card key={card.rank + card.suit} card={card} />
                        : null
                )
            }
        </div>
    )
};
import React from 'react';
import chip from "../../../images/chip.png";

export const Bet = (props) => {

    return (
        <div className={'bet'}>
            <img src={chip} alt="chip" width="25px"/>
            <span>{props.bet}€</span>
        </div>
    )
};
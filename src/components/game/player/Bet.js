import React from 'react';
import chips from "../../../images/chips.png";

export const Bet = (props) => {

    return (
        <div className={'bet'}>
            <img src={chips} alt="chip" width="25px"/>
            <span>{props.bet}€</span>
        </div>
    )
};
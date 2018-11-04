import React, { Component } from 'react';
import Actions from "./Actions";
import CommonCards from "./CommonCards";

class Game extends Component {

    render() {
        return (
            <div>
                <div>Manche [type]</div>
                <div>Pot : xxx€</div>

                <CommonCards />

                <Actions />
            </div>
        )
    }
}

export default Game;
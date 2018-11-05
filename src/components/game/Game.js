import React, { Component } from 'react';
import Actions from "./Actions";
import Table from "./Table";

class Game extends Component {

    render() {
        return (
            <div>
                <div>Manche [type]</div>
                <div>Pot : xxx€</div>

                <Table />

                <Actions />
            </div>
        )
    }
}

export default Game;
import React, { Component } from 'react';
import Actions from "./Actions";
import Table from "./Table";
import Pusher from 'react-pusher';

class Game extends Component {

    render() {
        return (
            <div>
                <div>Manche [type]</div>
                <div>Pot : xxx€</div>

                <Table />

                <Actions />

                {/*<Pusher*/}
                    {/*channel="game"*/}
                    {/*event="listChanged"*/}
                    {/*onUpdate={console.log('changed')}*/}
                {/*/>*/}
            </div>
        )
    }
}

export default Game;
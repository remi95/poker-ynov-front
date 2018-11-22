import React from 'react';
import {CommonCards} from "./CommonCards";
import Player from "./player/Player";

export const Table = (props) => {

    return (
        <div id="table">
            <CommonCards cards={props.cards} />

            <div id="table-top">
                {
                    props.players.map(player =>
                        player.position === 'top'
                            ? <Player key={player.user.id} player={player} />
                            : null
                    )
                }
            </div>
            <div id="table-center" className={'d-flex justify-between align-items-center'}>
                {
                    props.players.map(player =>
                        player.position === 'left'
                            ? <Player key={player.user.id} player={player} />
                            : null
                    )
                }

                {
                    props.players.map(player =>
                        player.position === 'right'
                            ? <Player key={player.user.id} player={player} />
                            : null
                    )
                }
            </div>
            <div id="table-bottom">
                {
                    props.players.map(player =>
                        player.position === 'bottom'
                            ? <Player key={player.user.id} player={player} />
                            : null
                    )
                }
            </div>
        </div>
    )
};


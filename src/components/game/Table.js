import React from 'react';
import {CommonCards} from "./CommonCards";
import Player from "./player/Player";

export const Table = (props) => {

    return (
        <div id="table">
            <CommonCards cards={props.cards} />

            <div id="table-top">
                {
                    props.players.map(user =>
                        user.position === 'top'
                            ? <Player key={user.id} user={user} />
                            : null
                    )
                }
            </div>
            <div id="table-center" className={'d-flex justify-between align-items-center'}>
                {
                    props.players.map(user =>
                        user.position === 'left'
                            ? <Player key={user.id} user={user} />
                            : null
                    )
                }

                {
                    props.players.map(user =>
                        user.position === 'right'
                            ? <Player key={user.id} user={user} />
                            : null
                    )
                }
            </div>
            <div id="table-bottom">
                {
                    props.players.map(user =>
                        user.position === 'bottom'
                            ? <Player key={user.id} user={user} />
                            : null
                    )
                }
            </div>
        </div>
    )
};


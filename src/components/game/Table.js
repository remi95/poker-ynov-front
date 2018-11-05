import React, { Component } from 'react';
import CommonCards from "./CommonCards";
import {PlayerTop} from "./players/PlayerTop";
import {PlayerLeft} from "./players/PlayerLeft";
import {PlayerRight} from "./players/PlayerRight";
import {PlayerBottom} from "./players/PlayerBottom";

class Table extends Component {

    constructor() {
        super();

        this.state = {
            playersTop: [{id:1}, {id:2}],
            playersLeft: [{id:3}],
            playersRight: [{id:4}],
            playersBottom: [{id:5}, {id:6}],
        }
    }

    render() {
        return (
            <div id="table">
                <div id="table-top">
                    {
                        this.state.playersTop.map(user =>
                            <PlayerTop key={user.id} user={user} />
                        )
                    }
                </div>
                <div id="table-center">
                    {
                        this.state.playersLeft.map(user =>
                            <PlayerLeft key={user.id} user={user} />
                        )
                    }

                    <CommonCards />

                    {
                        this.state.playersRight.map(user =>
                            <PlayerRight key={user.id} user={user} />
                        )
                    }
                </div>
                <div id="table-bottom">
                    {
                        this.state.playersBottom.map(user =>
                            <PlayerBottom key={user.id} user={user} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Table;
import React, { Component } from 'react';
import CommonCards from "./CommonCards";
import {PlayerTop} from "./players/PlayerTop";
import {PlayerLeft} from "./players/PlayerLeft";
import {PlayerRight} from "./players/PlayerRight";
import {PlayerBottom} from "./players/PlayerBottom";
import {sortPlayers} from "../../helpers/game";
import {checkUser} from "../../actions/authAction";
import {pushAlert} from "../../actions/alertAction";
import connect from "react-redux/es/connect/connect";

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = sortPlayers(props.gameReducer.players)
    }

    render() {
        console.log(this.state.players)
        return (
            <div id="table">
                <div id="table-top">
                    {
                        this.state.top.map(user =>
                            user !== null
                                ? <PlayerTop key={user.id} user={user} />
                                : null
                        )
                    }
                </div>
                <div id="table-center">
                    {
                        this.state.left.map(user =>
                            user !== null
                                ? <PlayerLeft key={user.id} user={user} />
                                : null
                        )
                    }

                    <CommonCards />

                    {
                        this.state.right.map(user =>
                            user !== null
                                ? <PlayerRight key={user.id} user={user} />
                                : null
                        )
                    }
                </div>
                <div id="table-bottom">
                    {
                        this.state.bottom.map(user =>
                            user !== null
                                ? <PlayerBottom key={user.id} user={user} />
                                : null
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ gameReducer }) => {
    return {
        gameReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(checkUser(user)),
        alert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
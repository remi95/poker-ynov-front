import React, { Component } from 'react';
import Actions from "./Actions";
import {Table} from "./Table";
import {init, newRound, newStep, updateAfterAction} from "../../actions/gameAction";
import connect from "react-redux/es/connect/connect";
import socketClient from "../../clients/socketClient";

class Game extends Component {

    action = () => {
        this.props.action({
            pot: 100,
            player: {
                id: 1,
                username: 'louis',
                money: 4900,
                bet: 100,
                order: 1,
                role: 'SMALL_BLIND',
            }
        })
    };

    newStep = () => {
        this.props.newStep([
            {
                value: 'A',
                color: 'HEART',
            },
            {
                value: 'A',
                color: 'CLOVER',
            }
        ])
    };

    newRound = () => {
        this.props.newRound({
            round: 2,
            hand: [
                {
                    value: 'J',
                    color: 'CLOVER',
                },
                {
                    value: '10',
                    color: 'DIAMOND',
                }
            ]
        })
    };

    render() {
        const game = this.props.gameReducer;

        return (
            <div className={'bg-game'}>
                <div id={'pot'}>Pot : {game.pot}€</div>

                <Table
                    players={game.players}
                    cards={game.rounds[game.rounds.length -1].communityCards} />

                <Actions />
            </div>
        )
    }

    componentDidMount() {
        socketClient.io.socket.on('action', data => {
            this.props.action(data)
        });
        socketClient.io.socket.on('newTurn', data => {
            this.props.newStep(data)
        })
    }
}

const mapStateToProps = ({ gameReducer, userReducer }) => {
    return {
        gameReducer,
        userReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: (data) => dispatch(updateAfterAction(data)),
        init: (data) => dispatch(init(data)),
        newStep: (data) => dispatch(newStep(data)),
        newRound: (data) => dispatch(newRound(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
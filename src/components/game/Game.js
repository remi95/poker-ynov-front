import React, { Component } from 'react';
import Actions from "./Actions";
import {Table} from "./Table";
import {init, newRound, newStep, updateAfterAction} from "../../actions/gameAction";
import connect from "react-redux/es/connect/connect";
import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import {API_URL} from "../../config";
const io = sailsIOClient(socketIOClient);
io.sails.url = API_URL;
io.sails.headers = {
    "Authorization": `Bearer ${Cookies.get('user-token')}`
};

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

    testButton = () => {
        // io.socket.get('/say/hello', (data, jwRes) => {
        //     console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
        // });
        io.socket.get('/say/hello');
    };

    fold = () => {
        io.socket.post('/action', {
            type: 'fold',
            bet: 500,
            user: this.props.userReducer.user
        }, (data) => console.log(data));
    };

    render() {
        const game = this.props.gameReducer;

        return (
            <div>
                <button onClick={this.action}>action</button>
                <button onClick={this.newStep}>new step</button>
                <button onClick={this.newRound}>new round</button>
                <button onClick={this.testButton}>test button</button>

                <div>Manche {game.round}</div>
                <div>Pot : {game.pot} €</div>

                <Table players={game.players} cards={game.cards} />

                <Actions fold={ this.fold } />
            </div>
        )
    }

    componentDidMount() {
        this.props.init({
            round: 1,
            pot: 0,
            bigBlind: 100,
            players: [
                {
                    id: 1,
                    username: 'louis',
                    money: 5000,
                    bet: 0,
                    order: 1,
                    role: 'SMALL_BLIND',
                    position: 'left'
                },
                {
                    id: 2,
                    username: 'arnaud',
                    money: 5000,
                    bet: 0,
                    order: 2,
                    role: null,
                    position: 'top'
                },
                {
                    id: 5,
                    username: 'remi',
                    money: 5000,
                    bet: 0,
                    order: 3,
                    role: null,
                    position: 'bottom'
                },
                {
                    id: 4,
                    username: 'guillaume',
                    money: 5000,
                    bet: 0,
                    order: 4,
                    role: null,
                    position: 'bottom'
                }
            ],
            cards: [
                {
                    value: 10,
                    color: 'SPADE',
                },
                {
                    value: 8,
                    color: 'HEART',
                },
                {
                    value: 'K',
                    color: 'DIAMOND',
                },
            ],
            hand: [
                {
                    value: 10,
                    color: 'SPADE',
                },
                {
                    value: 10,
                    color: 'HEART',
                },
            ]
        });
        io.socket.on('hello', (data) => {
            console.log('Socket joined the party!');
        });
        io.socket.on('action', (data) => {
            console.log('action', data);
        });
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
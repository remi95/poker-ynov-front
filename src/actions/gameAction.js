import {GAME_ACTION, GAME_GET_HAND, GAME_INIT, GAME_RESULTS, GAME_ROUND, GAME_STEP} from "../constants";
import {placePlayers, sortPlayers} from "../helpers/game";
import {pushAlert} from "./alertAction";
import {alert} from "../helpers/global";
import history from "../helpers/history";
import socketClient from "../clients/socketClient";

const action = (data) => {
    return {
        type: GAME_ACTION,
        data
    }
};

const step = (data) => {
    return {
        type: GAME_STEP,
        data
    }
};

const round = (data) => {
    return {
        type: GAME_ROUND,
        data
    }
};

const results = (data) => {
    return {
        type: GAME_RESULTS,
        data
    }
};

export const init = (data) => {
    let players = sortPlayers(data.players);
    players = placePlayers(players);
    data.players = players;
    data.communityCards = [];
    data.playersCards = [];

    return {
        type: GAME_INIT,
        data
    }
};

export const getHand = (data) => {
    return {
        type: GAME_GET_HAND,
        data
    }
};

export const updateAfterAction = (data) => {
    return (dispatch, getState) => {
        let players = getState().gameReducer.players;

        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].chips = data.players[j].chips;
                    players[i].currentBet = data.players[j].currentBet;
                    players[i].hasDropped = data.players[j].hasDropped;
                    players[i].hasPlayedTurn = data.players[j].hasPlayedTurn;
                    break;
                }
            }
        }

        const {playingPlayerId, playingPlayerCallValue, pot} = data;

        dispatch(action({
            pot,
            playingPlayerId,
            playingPlayerCallValue,
            players
        }))
    }
};

export const newStep = (data) => {
    return (dispatch, getState) => {
        let players = getState().gameReducer.players;

        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].chips = data.players[j].chips;
                    players[i].currentBet = data.players[j].currentBet;
                    players[i].hasDropped = data.players[j].hasDropped;
                    players[i].hasPlayedTurn = data.players[j].hasPlayedTurn;
                    break;
                }
            }
        }

        const {playingPlayerId, communityCards, playingPlayerCallValue} = data;

        dispatch(step({
            communityCards,
            players,
            playingPlayerId,
            playingPlayerCallValue
        }))
    }
};

export const finishRound = (data) => {
    return (dispatch) => {
        dispatch(showResults(data));

        setTimeout(() => {
                if (data.gameStatus === 'FINISHED') {
                    dispatch(pushAlert(alert('success', 'La partie est terminée. N\'hésitez pas à rejouer !')))
                    history.push('/');
                } else {
                    console.log('settimeout')
                    dispatch(startNewRound(data));
                }
            }, 5000)
    };
};

const showResults = (data) => {
    return (dispatch, getState) => {
        let players = getState().gameReducer.players;
console.log(data)
        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].combination = {
                        rank: data.players[j].combination !== null ? data.players[j].combination.rank : null,
                    };
                    break;
                }
            }
        }

        const {playersCards} = data;

        dispatch(results({
            players,
            playersCards,
        }))
    };
};

const startNewRound = (data) => {
    return async (dispatch, getState) => {
        console.log('start the new round')
        let players = getState().gameReducer.players;

        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].chips = data.players[j].chips;
                    players[i].currentBet = data.players[j].currentBet;
                    players[i].isEliminated = data.players[j].isEliminated;
                    players[i].combination = null;
                    break;
                }
            }
        }

        const {playingPlayerId, playingPlayerCallValue, pot, communityCards} = data;

        await socketClient.io.socket.post(`/user/${getState().userReducer.user.id}/cards`, {
            gameId: getState().gameReducer.id
        }, (userCards) => {
           dispatch(getHand(userCards));
        });

        dispatch(round({
            pot,
            players,
            playingPlayerId,
            playingPlayerCallValue,
            communityCards,
            playersCards: [],
        }))
    };
};


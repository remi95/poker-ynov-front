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
    data.showingResults = false;

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
                    dispatch(finishGame(data));
                }
                else {
                    dispatch(startNewRound(data));
                }
            }, 10000)
    };
};

const showResults = (data) => {
    return (dispatch, getState) => {
        let players = getState().gameReducer.players;
        let droppedPlayers = 0;

        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].combination =  data.players[j].combination;
                    players[i].earnedMoney =  data.players[j].earnedMoney;
                    break;
                }
            }

            droppedPlayers += players[i].hasDropped ? 1 : 0;
        }

        let winnerIds = data.gameStatus === 'FINISHED'
            ? [data.winnerId]
            : data.winnerIds;

        dispatch(results({
            players,
            playersCards: data.playersCards,
            winnerIds,
            communityCards: data.previousCommunityCards && data.previousCommunityCards.length > 0
                ? data.previousCommunityCards
                : getState().gameReducer.communityCards,
            allPlayersDropped: droppedPlayers >= players.length,
        }))
    };
};

const startNewRound = (data) => {
    return async (dispatch, getState) => {
        let players = getState().gameReducer.players;

        for (let i in players) {
            for (let j in data.players) {
                if (data.players[j].user.id === players[i].user.id) {
                    players[i].chips = data.players[j].chips;
                    players[i].currentBet = data.players[j].currentBet;
                    players[i].hasDropped = data.players[j].hasDropped;
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

const finishGame = (data) => {
    return (dispatch, getState) => {
        let winnerName = null;
        let message = null;

        for (let player of data.players) {
            if (player.user.id === data.winnerId) {
                winnerName = player.user.username;

                if (player.user.id === getState().userReducer.user.id) {
                    message = 'Bravo, vous avez remporté la partie ! Gagnez plus en rejouant !'
                }
                else {
                    message = `La partie est terminée, ${winnerName} a gagné ! Retentez vite votre chance en rejouant.`;
                }
            }
        }

        dispatch(pushAlert(alert('success', message)));
        history.push('/');
    }
};

export const cantJoinGame = (message) => {
    return async(dispatch) => {
        dispatch(pushAlert(alert('error', message)));
    }
};

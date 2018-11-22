import {GAME_ACTION, GAME_GET_HAND, GAME_INIT, GAME_ROUND, GAME_STEP} from "../constants";
import {placePlayers, resetPlayersBet, sortPlayers} from "../helpers/game";
import store from "../store";

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

export const init = (data) => {
    let players = sortPlayers(data.players);
    players = placePlayers(players);
    data.players = players;

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
    return (dispatch) => {
        let players = store.getState().gameReducer.players;

        for (let i in players) {
            for (let j in data.game.players) {
                if (data.game.players[j].user.id === players[i].user.id) {
                    players[i].chips = data.game.players[j].chips;
                    players[i].currentBet = data.game.players[j].currentBet;
                    players[i].hasDropped = data.game.players[j].hasDropped;
                    players[i].hasPlayedTurn = data.game.players[j].hasPlayedTurn;
                    break;
                }
            }
        }

        dispatch(action({ playingPlayerId: data.game.playingPlayerId, players }))
    }
};

export const newStep = (data) => {
    return (dispatch) => {
        let players = resetPlayersBet(store.getState().gameReducer.players);

        const {playingPlayerId, rounds} = data.game;

        dispatch(step({ rounds, players, playingPlayerId }))
    }
};

export const newRound = (data) => {
    return (dispatch) => {
        data.players = resetPlayersBet(store.getState().gameReducer.players);

        dispatch(round(data))
    };
};


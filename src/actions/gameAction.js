import {GAME_ACTION, GAME_INIT, GAME_ROUND, GAME_STEP} from "../constants";
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

export const updateAfterAction = (data) => {
    return (dispatch) => {
        let players = store.getState().gameReducer.players;

        for (let i in players) {
            if (data.player.id === players[i].id) {
                players[i].money = data.player.money;
                players[i].bet = data.player.bet;
                break;
            }
        }

        dispatch(action({ pot: data.pot, players }))
    }
};

export const newStep = (cards) => {
    return (dispatch) => {
        let players = resetPlayersBet(store.getState().gameReducer.players);

        dispatch(step({ cards, players }))
    }
};

export const newRound = (data) => {
    return (dispatch) => {
        data.players = resetPlayersBet(store.getState().gameReducer.players);

        dispatch(round(data))
    };
};


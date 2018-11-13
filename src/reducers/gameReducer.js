import {GAME_ACTION, GAME_INIT, GAME_ROUND, GAME_STEP} from "../constants";

let initialState = {
    round: 0,
    pot: 0,
    bigBlind: 100,
    players: [],
    cards: [],
    hand: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GAME_INIT:
            return action.data;
        case GAME_ACTION:
            return {
                ...state,
                pot: action.data.pot,
                players: action.data.players,
            };
        case GAME_STEP:
            return {
                ...state,
                cards: state.cards.concat(action.data.cards),
                players: action.data.players,
            };
        case GAME_ROUND:
            return {
                ...state,
                round: action.data.round,
                hand: action.data.hand,
                pot: 0,
                cards: [],
                players: action.data.players,
            };
        default:
            return state;
    }
};

export default gameReducer;
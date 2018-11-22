import {GAME_ACTION, GAME_GET_HAND, GAME_INIT, GAME_ROUND, GAME_STEP} from "../constants";

/**
 * Example of state after GAME_INIT action.
 */
let initialState = {
    pot: 0,
    hand: [
        {
            rank: 'Seven',
            suit: 'DIAMOND',
        }
    ],
    bigBlind: 20,
    dealerPosition: 0,
    gameFlags: [
        "GAME_STARTED",
        "NEW_ROUND",
        "NEW_TURN"
    ],
    gameStatus: "IN_PROGRESS",
    id: 3,
    players: [
        {
            chips: 2000,
            combination: null,
            currentBet: 20,
            earnedMoney: null,
            hasDropped: false,
            hasPlayTurn: false,
            ignoredForRound: false,
            isEliminated: false,
            position: "bottom",
            user: {
                email: "username@email.com",
                id: 6,
                money: 50000,
                username: "CP",
            }
        }
    ],
    playingPlayerId: 5,
    rounds: [
        {
            communityCards: [],
            currentTurnPhase: "PREFLOP",
        }
    ],
    smallBlind: 10,
    startingChips: 2000,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GAME_INIT:
            return action.data;
        case GAME_GET_HAND:
            return {
                ...state,
                hand: action.data,
            };
        case GAME_ACTION:
            return {
                ...state,
                // pot: action.data.pot,
                playingPlayerId: action.data.playingPlayerId,
                players: action.data.players,
            };
        case GAME_STEP:
            return {
                ...state,
                rounds: action.data.rounds,
                playingPlayerId: action.data.playingPlayerId,
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
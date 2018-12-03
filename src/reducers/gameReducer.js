import {
    GAME_ACTION,
    GAME_GET_HAND,
    GAME_INIT,
    GAME_LAST_ACTION,
    GAME_RESULTS,
    GAME_ROUND,
    GAME_STEP
} from "../constants";

/**
 * Example of state after GAME_INIT action.
 */
let initialState = {
    pot: 0,
    lastAction: null,
    communityCards: [],
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
            roles: [],
            user: {
                email: "username@email.com",
                id: 6,
                money: 50000,
                username: "CP",
            }
        }
    ],
    playersCards: [],
    playingPlayerId: 5,
    playingPlayerCallValue: 0,
    rounds: [
        {
            communityCards: [],
            currentTurnPhase: "PREFLOP",
        }
    ],
    smallBlind: 10,
    startingChips: 2000,
    showingResults: false,
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
                pot: action.data.pot,
                playingPlayerId: action.data.playingPlayerId,
                playingPlayerCallValue: action.data.playingPlayerCallValue,
                players: action.data.players,
            };
        case GAME_LAST_ACTION:
            return {
                ...state,
                lastAction: action.data,
            };
        case GAME_STEP:
            return {
                ...state,
                players: action.data.players,
                communityCards: action.data.communityCards,
                playingPlayerId: action.data.playingPlayerId,
                playingPlayerCallValue: action.data.playingPlayerCallValue,
            };
        case GAME_ROUND:
            return {
                ...state,
                pot: 0,
                communityCards: action.data.communityCards,
                players: action.data.players,
                playingPlayerId: action.data.playingPlayerId,
                playingPlayerCallValue: action.data.playingPlayerCallValue,
                playersCards: action.data.playersCards,
                showingResults: false,
                winnerIds: [],
            };
        case GAME_RESULTS:
            return {
                ...state,
                players: action.data.players,
                playersCards: action.data.playersCards,
                winnerIds: action.data.winnerIds,
                playingPlayerId: 0,
                showingResults: true,
            };
        default:
            return state;
    }
};

export default gameReducer;
import store from "../store";

export const getCardSymbol = (symbol) => {
    switch(symbol) {
        case 'SPADE':
            return require('images/spade.png');
        case 'HEART':
            return require('images/heart.png');
        case 'CLOVER':
            return require('images/clover.png');
        case 'DIAMOND':
            return require('images/diamond.png');
        default:
            return null
    }
};

export const sortPlayers = (players) => {
    let sortedPlayers = [];

    for (let i in players) {
        if (players[i].id === store.getState().userReducer.user.id) {
            let part1 = players.slice(0, i);
            let part2 = players.slice(i);
            sortedPlayers = part2.concat(part1)
            break;
        }
    }

    let me = players[0];
    players[0] = players[1];
    players[1] = me;

    return sortedPlayers
};

export const placePlayers = (players) => {
    if (players[0] !== undefined) players[0].position = 'bottom';
    if (players[1] !== undefined) players[1].position = 'bottom';
    if (players[2] !== undefined) players[2].position = 'left';
    if (players[3] !== undefined) players[3].position = 'top';
    if (players[4] !== undefined) players[4].position = 'top';
    if (players[5] !== undefined) players[5].position = 'top';
    if (players[6] !== undefined) players[6].position = 'right';
    if (players[7] !== undefined) players[7].position = 'bottom';

    return players;
};

export const resetPlayersBet = (players) => {
    for (let player of players) {
        player.bet = 0;
    }

    return players;
};
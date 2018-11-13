import store from "../store";

export const sortPlayers = (initialPlayers) => {

    let players = playersWithMeFirst(initialPlayers);

    return {
        top: [
            players[3] ? players[3] : null,
            players[4] ? players[4] : null,
            players[5] ? players[5] : null,
        ],
        bottom: [
            players[1] ? players[1] : null,
            players[0] ? players[0] : null,
            players[7] ? players[7] : null,
        ],
        left: [
            players[2] ? players[2] : null,
        ],
        right: [
            players[6] ? players[6] : null,
        ],
    }
};

const playersWithMeFirst = (players) => {
    let playersWithMeFirst = [];

    for (let i in players) {
        if (players[i].id === store.getState().userReducer.user.id) {
            let part1 = players.slice(0, i);
            let part2 = players.slice(i);
            playersWithMeFirst = part2.concat(part1)
            break;
        }
    }

    return playersWithMeFirst
};
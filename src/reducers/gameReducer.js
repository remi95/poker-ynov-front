
let initialState = {
    round: 0,
    pot: null,
    players: [
        {
            id: 1,
            username: 'louis',
            money: 5000,
            bet: 150,
            order: 1,
            role: 'SMALL_BLIND',
        },
        {
            id: 2,
            username: 'arnaud',
            money: 5000,
            bet: 350,
            order: 2,
            role: null,
        },
        {
            id: 5,
            username: 'remi',
            money: 5000,
            bet: 200,
            order: 3,
            role: null,
        },
        {
            id: 4,
            username: 'guillaume',
            money: 5000,
            bet: 100,
            order: 4,
            role: null,
        }
    ],
    cards: [
        {
            value: 10,
            color: 'SPIKE',
        },
        {
            value: null,
            color: null,
        },
        {
            value: null,
            color: null,
        },
        {
            value: null,
            color: null,
        },
    ],
    hand: [
        {
            value: 10,
            color: 'SPIKE',
        },
        {
            value: null,
            color: null,
        },
    ]
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default gameReducer;
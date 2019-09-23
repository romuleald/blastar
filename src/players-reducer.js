import {createReducer} from './create-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import shuffleArray from 'shuffle-array';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const {createLogger} = require('redux-logger');
    const logger = createLogger({collapsed: true});
    middlewares.push(logger);
}

export const PLAYERS = 'PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const CHANGE_CARD = 'CHANGE_CARD';
const START_GAME = 'START_GAME';

const initialPlayerState = {
    players: {
        name: {
            name: 'Player',
            cards: []
        }
    },
    stockCards: [],
    wasteCards: [],
    roomId: 0,
    currentPlayerName: ''
};

const DUPLICATION_CARD = 4;
const CARD_INDEX = 13;
const cardsInGame = CARD_INDEX * DUPLICATION_CARD;

const setInitialCards = () => {
    const cards = [];
    for (let i = 0; i < (cardsInGame); i++) {
        cards.push((i % CARD_INDEX) + 1);
    }
    return cards;
};
const triceCards = (cards) => {
    return shuffleArray(cards);
};

// REDUCERS
const playersReducer = createReducer({
    [PLAYERS]: (state, data) => ({
        ...state,
        ...data
    }),
    [ADD_PLAYER]: (state, data) => {
        const players = state.players;
        players[data.name] = {...data};
        return {
            ...state,
            players
        };
    },
    [START_GAME]: (state) => {
        const stockCards = triceCards(setInitialCards());
        const players = {...state.players};
        const updatedPlayers = Object.keys(players).reduce((accPlayers, playerName) => {
            accPlayers.players[playerName].name = playerName;
            accPlayers.players[playerName].cards = [];
            accPlayers.players[playerName].cards.push(stockCards.shift());
            accPlayers.players[playerName].cards.push(stockCards.shift());
            accPlayers.players[playerName].cards.push(stockCards.shift());
            accPlayers.players[playerName].cards.push(stockCards.shift());
            return accPlayers;
        }, {...state});
        return {
            ...state,
            players: updatedPlayers.players,
            stockCards
        };
    }

}, initialPlayerState);

// ACTIONS
export const addPlayer = ({name}) => ({
    type: ADD_PLAYER,
    data: {
        name,
        cards: []
    }
});

export const addCard = ({name, card}) => ({
    type: ADD_PLAYER,
    data: {
        name,
        card
    }
});
export const startGame = () => ({
    type: START_GAME
});

const reducer = combineReducers({
    [PLAYERS]: playersReducer
});

export const appStore = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default appStore;

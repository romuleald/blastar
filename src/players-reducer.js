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
    currentPlayerName: ''
};

let cardsStock = [];
let cardsJunk = [];
let DUPLICATION_CARD = 4;
let CARD_INDEX = 13;
const cardsInGame = CARD_INDEX * DUPLICATION_CARD;

const triceCards = (cards) => {
    for (let i = 0; i < (cardsInGame); i++) {
        cards.push((i % CARD_INDEX) + 1);
    }
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
    [START_GAME]: (state, data) => {
        cardsStock = triceCards(cardsStock);
        const players = {...state.players};
        const lol = Object.keys(players).reduce((accPlayers, playerName) => {
            console.info({accPlayers, playerName});
            accPlayers.players[playerName].cards = [];
            accPlayers.players[playerName].cards.push(cardsStock.shift());
            accPlayers.players[playerName].cards.push(cardsStock.shift());
            accPlayers.players[playerName].cards.push(cardsStock.shift());
            accPlayers.players[playerName].cards.push(cardsStock.shift());
            console.info(cardsStock);
            return accPlayers;
        }, {...state});
        console.info(lol);
        return {
            ...state
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

import * as R from 'ramda';
import {createReducer} from './create-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import shuffleArray from 'shuffle-array';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    const {createLogger} = require('redux-logger');
    const logger = createLogger({collapsed: true});
    middleware.push(logger);
}

export const PLAYERS = 'PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const ADD_PUNITIVE_CARD = 'ADD_PUNITIVE_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const CHANGE_CARD = 'CHANGE_CARD';
const FLIP_CARD = 'FLIP_CARD';
const START_GAME = 'START_GAME';

const initialPlayerState = {
    players: {
        Player: {
            name: 'Player',
            cards: [
                {
                    value: '',
                    isVisible: false
                }

            ]
        }
    },
    stockCards: [],
    wasteCards: [],
    roomId: 0,
    currentPlayerName: ''
};

const DUPLICATION_CARD = 4;
const CARD_INDEX = 13;
const HERO_NUMBER = 8;
const BOSS_NUMBER = 6;

const generateHeroes = () => R.pipe(
    shuffleArray,
    R.take(4),
    R.map(R.toString),
    R.map(R.concat('0.'))
)(R.range(0, HERO_NUMBER));

const generateBosses = () => R.pipe(
    shuffleArray,
    R.take(2),
    R.map(R.toString),
    R.map(R.concat('14.'))
)(R.range(0, BOSS_NUMBER));

const setInitialCards = () => R.pipe(
    R.map(R.add(1)),
    R.map(R.toString),
    R.map(
        cardIndex => {
            if (cardIndex === '6') {
                return (
                    R.zip(
                        R.repeat(cardIndex, DUPLICATION_CARD),
                        ['0', '0', '1', '1']
                    )).map(R.join('.'));
            }
            if (cardIndex === '13') {
                return R.zip(
                    R.repeat(cardIndex, DUPLICATION_CARD),
                    ['0', '1', '2', '3']
                ).map(R.join('.'));
            }
            return R.repeat(cardIndex, DUPLICATION_CARD);
        }
    ),
    R.flatten,
    R.concat(generateHeroes()),
    R.concat(generateBosses())
)(R.range(0, CARD_INDEX));

// REDUCERS
const playersReducer = createReducer({
    [ADD_PLAYER]: (state, data) => {
        const clonedState = R.clone(state);
        const players = clonedState.players;
        players[data.name] = {...data};
        return clonedState;
    },
    [ADD_PUNITIVE_CARD]: (state, data) => {
        const {name} = data;
        const clonedState = R.clone(state);
        const {players} = clonedState;
        const card = clonedState.stockCards.splice(1, 1);
        players[name].cards.push(card[0]);
        return {
            ...clonedState
        };
    },
    [FLIP_CARD]: (state, data) => {
        const {playerName, cardIndex} = data;
        const clonedState = R.clone(state);
        const {players} = clonedState;
        players[playerName].cards[cardIndex].isVisible = !players[playerName].cards[cardIndex].isVisible;
        return {
            ...clonedState
        };
    },
    [START_GAME]: (state) => {
        const isVisible = false;
        const stockCards = shuffleArray(setInitialCards());
        const clonedState = R.clone(state);
        const players = clonedState.players;
        const updatedPlayers = Object.keys(players).reduce((accPlayers, playerName) => {
            accPlayers.players[playerName].name = playerName;
            accPlayers.players[playerName].cards = [];
            accPlayers.players[playerName].cards.push({value: stockCards.shift(), isVisible});
            accPlayers.players[playerName].cards.push({value: stockCards.shift(), isVisible});
            accPlayers.players[playerName].cards.push({value: stockCards.shift(), isVisible});
            accPlayers.players[playerName].cards.push({value: stockCards.shift(), isVisible});
            return accPlayers;
        }, {...clonedState});
        return {
            ...clonedState,
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

export const addPunitiveCard = ({name}) => ({
    type: ADD_PUNITIVE_CARD,
    data: {
        name
    }
});
export const flipCard = ({playerName, cardIndex}) => ({
    type: FLIP_CARD,
    data: {
        playerName,
        cardIndex
    }
});
export const startGame = () => ({
    type: START_GAME
});

const reducer = combineReducers({
    [PLAYERS]: playersReducer
});

export const appStore = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default appStore;

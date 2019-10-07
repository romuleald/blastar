import * as R from 'ramda';
import {createReducer} from '../helpers/redux';
import {actions} from '../constants/gameConstants';
import {actions as playerActions} from '../constants/playerConstants';
import {BlastarState, Player} from "./players-reducer.type";

const initialGameState: BlastarState = {
    players: {},
    stockCards: [],
    wasteCards: [],
    roomId: 0,
    currentPlayerName: '',
    isGameStarted: false,
    isCardViewerVisible: false,
    cardListToView: []
};

const defaultPlayer: Player = {
    initialCardNumber: 4,
    initialCardView: 2,
    cards: []
};

export const playersReducer = createReducer({
    [actions.ADD_PLAYER]: (state: BlastarState, {name, ...params}) => ({
        ...state,
        players: {
            ...state.players,
            [name]: {
                ...params,
                ...defaultPlayer,
                name
            }
        }
    }),
    [actions.ADD_PUNITIVE_CARD]: (state: BlastarState, {name}) => {
        const clonedState = R.clone(state);
        const {players} = clonedState;
        const firstCardValue = clonedState.stockCards.splice(0, 1);

        players[name].cards.push({value: firstCardValue, isVisible: false});

        return clonedState;
    },
    [playerActions.FLIP_CARD]: (state: BlastarState, {playerName, cardIndex}) => {
        const clonedState = R.clone(state);
        const {players} = clonedState;

        players[playerName].cards[cardIndex].isVisible = !players[playerName].cards[cardIndex].isVisible;

        return clonedState;
    },
    [playerActions.VIEW_PLAYER_CARD]: (state: BlastarState, {playerName, cardIndex}) => ({
        ...state,
        isCardViewerVisible: true,
        cardListToView: [
            state.players[playerName].cards[cardIndex]
        ]
    }),
    [playerActions.VIEW_FIRST_STOCK_CARD]: (state: BlastarState) => ({
        ...state,
        isCardViewerVisible: true,
        cardListToView: [{value: state.stockCards[0], isVisible: true}]
    }),
    [playerActions.VIEW_WASTE_CARD_LIST]: state => ({
        ...state,
        isCardViewerVisible: true,
        cardListToView: state.wasteCards.map(value => ({value, isVisible: true}))
    }),
    [playerActions.HIDE_CARD_VIEWER]: (state: BlastarState) => ({
        ...state,
        isCardViewerVisible: false
    }),
    [playerActions.DROP_PLAYER_CARD]: (state: BlastarState, {playerName, cardIndex}) => {
        const clonedState = R.clone(state);
        const {players, wasteCards} = clonedState;

        const droppedCard = players[playerName].cards.splice(cardIndex, 1)[0].value;
        wasteCards.unshift(droppedCard);

        return clonedState;
    },
    [actions.START_GAME_DONE]: (state, {cardListByPlayer, stockCards, wasteCards}) => ({
        ...state,
        isGameStarted: true,
        players: R.pipe(
            R.toPairs,
            R.map(([name, player]) => [name, R.assoc('cards', cardListByPlayer[name])(player)]),
            R.fromPairs
        )(state.players),
        stockCards,
        wasteCards
    })
}, initialGameState);

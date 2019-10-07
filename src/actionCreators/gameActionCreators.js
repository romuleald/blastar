import {actions} from '../constants/gameConstants';

export const addPlayer = ({name}) => ({
    type: actions.ADD_PLAYER,
    data: {name}
});

export const addPunitiveCard = ({name}) => ({
    type: actions.ADD_PUNITIVE_CARD,
    data: {name}
});

export const startGame = () => ({
    type: actions.START_GAME_REQUEST
});

export const startGameDone = (data) => ({
    type: actions.START_GAME_DONE,
    data
});

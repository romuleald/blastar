import {actions} from '../constants/playerConstants';

export const flipCard = ({playerName, cardIndex}) => ({
    type: actions.FLIP_CARD,
    data: {
        playerName,
        cardIndex
    }
});

export const viewPlayerCard = ({playerName, cardIndex}) => ({
    type: actions.VIEW_PLAYER_CARD,
    data: {playerName, cardIndex}
});

export const hideCardViewer = () => ({
    type: actions.HIDE_CARD_VIEWER
});

export const viewFirstStockCard = () => ({
    type: actions.VIEW_FIRST_STOCK_CARD
});

export const viewWasteCardList = () => ({
    type: actions.VIEW_WASTE_CARD_LIST
});

export const dropPlayerCard = ({playerName, cardIndex}) => ({
    type: actions.DROP_PLAYER_CARD,
    data: {playerName, cardIndex}
});

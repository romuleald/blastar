import * as R from 'ramda';
import shuffleArray from 'shuffle-array';
import {actions, HERO_NUMBER, BOSS_NUMBER, CARD_INDEX, DUPLICATION_CARD} from '../constants/gameConstants';
import {createMiddleware} from '../helpers/redux';
import {selectPlayerList} from '../selectors/playerSelectors';
import {startGameDone} from '../actionCreators/gameActionCreators';

const generateHeroes = () =>
    R.pipe(
        shuffleArray,
        R.take(4),
        R.map(R.toString),
        R.map(R.concat('0.'))
    )(R.range(0, HERO_NUMBER));

const generateBosses = () =>
    R.pipe(
        shuffleArray,
        R.take(2),
        R.map(R.toString),
        R.map(R.concat('14.'))
    )(R.range(0, BOSS_NUMBER));

const generateStockCards = () =>
    R.pipe(
        R.map(R.add(1)),
        R.map(R.toString),
        R.map(cardIndex => {
            // Brandon or Diana
            if (cardIndex === '6') {
                return R.zip(R.repeat(cardIndex, DUPLICATION_CARD), ['0', '0', '1', '1']).map(R.join('.'));
            }
            // Cthulhu
            if (cardIndex === '13') {
                return R.zip(R.repeat(cardIndex, DUPLICATION_CARD), ['0', '1', '2', '3']).map(R.join('.'));
            }
            return R.repeat(cardIndex, DUPLICATION_CARD);
        }),
        R.flatten,
        R.concat(generateHeroes()),
        R.concat(generateBosses()),
        R.concat(['-1.0', '-1.1', '15'])
    )(R.range(0, CARD_INDEX));

export const gameMiddleware = createMiddleware({
    [actions.START_GAME_REQUEST]: ({store, next, action}) => {
        next(action);
        const stockCards = shuffleArray(generateStockCards());
        const playerList = selectPlayerList(store.getState());
        const cardList = playerList.map(({name, initialCardNumber}) => [
            name,
            stockCards.splice(0, initialCardNumber).map(value => ({value, isVisible: false}))
        ]);
        const wasteCards = stockCards.splice(0, 1);
        store.dispatch(
            startGameDone({
                cardListByPlayer: R.fromPairs(cardList),
                wasteCards,
                stockCards
            })
        );
    }
});

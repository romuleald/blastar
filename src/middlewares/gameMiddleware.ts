import * as R from 'ramda';
import shuffleArray from 'shuffle-array';
import {
    actions,
    HERO_NUMBER,
    BOSS_NUMBER,
    CARD_INDEX,
    DUPLICATION_CARD,
    NUMBER_OF_HEROES_IN_A_GAME,
    NUMBER_OF_BOSSES_IN_A_GAME
} from '../constants/gameConstants';
import {CardState} from './../reducer/players-reducer.type';
import {createMiddleware} from '../helpers/redux';
import {selectPlayerList} from '../selectors/playerSelectors';
import {startGameDone, roomIdRequest} from '../actionCreators/gameActionCreators';
import { getRoomId } from '../sockets/room-socket';

const generateCardIds = (totalNumberInTheGame: number, numberInAGameSession: number, id: number) =>
    R.pipe(
        R.range(0),
        shuffleArray,
        R.take(numberInAGameSession),
        R.map(R.toString),
        R.map(R.concat(`${id.toString()}.`))
    )(totalNumberInTheGame);

const generateHeroes = () => generateCardIds(HERO_NUMBER, NUMBER_OF_HEROES_IN_A_GAME, 0);

const generateBosses = () => generateCardIds(BOSS_NUMBER, NUMBER_OF_BOSSES_IN_A_GAME, 14);

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
        // Add Lola, Leo, Hyperion
        R.concat(['-1.0', '-1.1', '15'])
    )(R.range(0, CARD_INDEX));

export const gameMiddleware = createMiddleware({
    [actions.START_GAME_REQUEST]: ({store, next, action}) => {
        next(action);
        store.dispatch(roomIdRequest());
        getRoomId();
        const stockCards: string[] = shuffleArray(generateStockCards());
        const playerList = selectPlayerList(store.getState());
        const cardListByPlayer: {[name: string]: CardState[]} = playerList.reduce(
            (result, {name, initialCardNumber}) => {
                const playerCardList = stockCards
                    .splice(0, initialCardNumber)
                    .map(value => ({value, isVisible: false}));
                result[name] = playerCardList;
                return result;
            },
            {}
        );
        const wasteCards = stockCards.splice(0, 1);
        store.dispatch(
            startGameDone({
                cardListByPlayer,
                wasteCards,
                stockCards
            })
        );
    }
});

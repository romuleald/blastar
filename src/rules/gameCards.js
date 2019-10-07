import lola from './cardPicture/lola.png';
import leo from './cardPicture/leo.png';
import carol from './cardPicture/carol.png'
import enzo from './cardPicture/enzo.png';
import jimbo from './cardPicture/jimbo.png';
import stephania from './cardPicture/stephania.png';
import daisy from './cardPicture/daisy.png';
import jayce from './cardPicture/jayce.png';
import herman from './cardPicture/herman.png';
import calypso from './cardPicture/calypso.png';
import helmut from './cardPicture/helmut.png';
import ezmo from './cardPicture/ezmo.png';
import bob from './cardPicture/bob.png';
import flies from './cardPicture/flies.png';
import sharkonaut from './cardPicture/sharkonaut.png';
import nowifi from './cardPicture/nowifi.png';
import diana from './cardPicture/diana.png';
import brandon from './cardPicture/brandon.png';
import creaturePool from './cardPicture/creature_pool.png';
import nutzians from './cardPicture/nutzians.png';
import alien from './cardPicture/alien.png';
import brusselsSprout from './cardPicture/brussels_sprout.png';
import yetirminator from './cardPicture/yetirminator.png';
import propzilla from './cardPicture/propzilla.png';
import cthulhu from './cardPicture/chtuhlu.png';
import gordon from './cardPicture/gordon.png';
import futura from './cardPicture/futura.png';
import maga from './cardPicture/maga.png';
import fawkes from './cardPicture/fawkes.png';
import hyperion from './cardPicture/hyperion.png';
import minus1 from './cardNumber/-1.png';
import zero from './cardNumber/0.png';
import one from './cardNumber/1.png';
import two from './cardNumber/2.png';
import three from './cardNumber/3.png';
import four from './cardNumber/4.png';
import five from './cardNumber/5.png';
import six from './cardNumber/6.png';
import seven from './cardNumber/7.png';
import eight from './cardNumber/8.png';
import nine from './cardNumber/9.png';
import ten from './cardNumber/10.png';
import eleven from './cardNumber/11.png';
import twelve from './cardNumber/12.png';
import thirteen from './cardNumber/13.png';
import fourteen from './cardNumber/14.png';
import fifthteen from './cardNumber/15.png';

export const gameCards = {
    '-1.0': {
        score: -1,
        picture: lola,
        numberPicture: minus1,
        endGamePower: {
            need: ['-1.1'],
            selfEffect: () => ({
                initialCardNumber: 3
            })
        }
    },
    '-1.1': {
        score: -1,
        picture: leo,
        numberPicture: minus1
        // Endgame Power is already in Lola
    },
    '0.0': {
        score: 0,
        picture: carol,
        numberPicture: zero,
        power: ['flipAllCards']
    },
    '0.1': {
        score: 0,
        picture: enzo,
        numberPicture: zero,
        endGamePower: {
            need: [],
            selfEffect: (cardList) => {
                const isEnzoVisible = cardList.find(({value}) => value === '0.1').isVisible;
                return isEnzoVisible
                    ? {initialCardView: 1}
                    : {initialCardNumber: 3}
            }
        }
    },
    '0.2': {
        score: 0,
        picture: jimbo,
        numberPicture: zero,
        endGamePower: {
            need: [],
            selfEffect: (cardList) => ({
                initialCardNumber: cardList.length,
                initialCardView: 0
            })
        }
    },
    '0.3': {
        score: 0,
        picture: stephania,
        numberPicture: zero
    },
    '0.4': {
        score: 0,
        picture: daisy,
        numberPicture: zero
    },
    '0.5': {
        score: 0,
        picture: jayce,
        numberPicture: zero
    },
    '0.6': {
        score: 0,
        picture: herman,
        numberPicture: zero
    },
    '0.7': {
        score: 0,
        picture: calypso,
        numberPicture: zero
    },
    '0.8': {
        score: 0,
        picture: helmut,
        numberPicture: zero
    },
    '1': {
        score: 1,
        picture: ezmo,
        numberPicture: one
    },
    '2': {
        score: 2,
        picture: bob,
        numberPicture: two
    },
    '3': {
        score: 3,
        picture: flies,
        numberPicture: three
    },
    '4': {
        score: 4,
        picture: sharkonaut,
        numberPicture: four
    },
    '5': {
        score: 5,
        picture: nowifi,
        numberPicture: five
    },
    '6.0': {
        score: 6,
        picture: diana,
        numberPicture: six
    },
    '6.1': {
        score: 6,
        picture: brandon,
        numberPicture: six
    },
    '7': {
        score: 7,
        picture: creaturePool,
        numberPicture: seven
    },
    '8': {
        score: 8,
        picture: nutzians,
        numberPicture: eight
    },
    '9': {
        score: 9,
        picture: alien,
        numberPicture: nine
    },
    '10': {
        score: 10,
        picture: brusselsSprout,
        numberPicture: ten
    },
    '11': {
        score: 11,
        picture: yetirminator,
        numberPicture: eleven
    },
    '12': {
        score: 12,
        picture: propzilla,
        numberPicture: twelve
    },
    '13.0': {
        score: 13,
        picture: cthulhu,
        numberPicture: thirteen,
        power: ['flipOneCard']
    },
    '13.1': {
        score: 13,
        picture: cthulhu,
        numberPicture: thirteen,
        power: ['flipTwoCardsOfDifferentPlayers']
    },
    '13.2': {
        score: 13,
        picture: cthulhu,
        numberPicture: thirteen,
        power: ['flipOneCard', 'flipTwoCardsOfDifferentPlayers']
    },
    '13.3': {
        score: 13,
        picture: cthulhu,
        numberPicture: thirteen,
        power: ['flipTwoCardsOfDifferentPlayers', 'flipTwoCardsOfDifferentPlayers']
    },
    '14.0': {
        score: 14,
        picture: gordon,
        numberPicture: fourteen
    },
    '14.1': {
        score: 14,
        picture: futura,
        numberPicture: fourteen
    },
    '14.2': {
        score: 14,
        picture: maga,
        numberPicture: fourteen
    },
    '14.3': {
        score: 14,
        picture: fawkes,
        numberPicture: fourteen
    },
    '15': {
        score: 15,
        picture: hyperion,
        numberPicture: fifthteen
    }
};

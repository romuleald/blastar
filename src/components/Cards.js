import * as R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import {flipCard, viewPlayerCard, dropPlayerCard} from '../actionCreators/playerActionCreators';
import {gameCards} from '../rules/gameCards';
import hiddenCardIllustration from './logo_radioactif.png';

const GameCard = ({title, isVisible, children}) => {
    const picture = R.path([title, 'picture'], gameCards);
    return (
        <div className="card-container">
            <div className="card">
                <img className="card-picture"
                    src={isVisible && picture ? picture : hiddenCardIllustration}
                    alt="card" />
            </div>
            {children}
        </div>
    );
};

/**
 * @param {Object} props - Props.
 * @param {string} playerName - Player name. Passed to the onClick function.
 * @param {number} cardIndex - Card index for the player. Passed to the onClick function.
 * @param {Function} onClick - Action on card click.
 * @param {boolean} isVisible - True if the card is visible.
 * @param {string} title - ID of the card.
 */
export const Card = ({title, isVisible, actionList = []}) => (
    <GameCard title={title} isVisible={isVisible}>
        {actionList.map(({label, onClick}, index) => (
            <button key={index} onClick={onClick}>{label}</button>
        ))}
    </GameCard>
);

export const PlayerCardList = ({cards, playerName, flipCard, viewPlayerCard, dropPlayerCard}) =>
    <div className="cards">
        {cards.map(({value: title, isVisible}, index) =>
            <Card
                key={index}
                title={title}
                isVisible={isVisible}
                playerName={playerName}
                cardIndex={index}
                actionList={[
                    {label: 'FLIP', onClick: flipCard({playerName, cardIndex: index})},
                    {label: 'VIEW', onClick: viewPlayerCard({playerName, cardIndex: index})},
                    {label: 'DROP', onClick: dropPlayerCard({playerName, cardIndex: index})}
                ]}>
            </Card>
        )}
    </div>;

const mapDispatchToProps = dispatch => ({
    flipCard: ({playerName, cardIndex}) => () => dispatch(flipCard({playerName, cardIndex})),
    viewPlayerCard: ({playerName, cardIndex}) => () => dispatch(viewPlayerCard({playerName, cardIndex})),
    dropPlayerCard: ({playerName, cardIndex}) => () => dispatch(dropPlayerCard({playerName, cardIndex}))
});

export default connect(null, mapDispatchToProps)(PlayerCardList);
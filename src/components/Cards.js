import React from 'react';
import store, {flipCard} from '../reducer/players-reducer';
import {connect} from 'react-redux';

export const Card = ({title, isVisible, flipCard, playerName, cardIndex}) =>
    <div
        className="card"
        onClick={() => flipCard({playerName, cardIndex})}>
        {isVisible ? title : '💀'}
    </div>;

const mapDispatchToProps = (dispatch) => ({
    flipCard: ({playerName, cardIndex}) => {
        return dispatch(flipCard({playerName, cardIndex}));
    }
});
const ConnectedCard = connect(null, mapDispatchToProps)(Card);

export const Cards = ({cards, playerName}) =>
    <div className="cards">
        {cards.map(({value: title, isVisible}, index) =>
            <ConnectedCard
                key={index}
                index={index}
                title={title}
                playerName={playerName}
                cardIndex={index}
                isVisible={isVisible}/>)}
    </div>;

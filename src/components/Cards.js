import React from 'react';
import store, {flipCard} from '../reducer/players-reducer';

const flipClick = ({cardIndex, playerName}) => () => {
    store.dispatch(flipCard({playerName, cardIndex}));
};

export const Card = ({title, isVisible, clickCallback}) => {
    return <div
        className="card"
        onClick={clickCallback}>{isVisible ? title : '💀'}</div>;
};

export const Cards = ({cards, playerName}) =>
    <div className="cards">
        {cards.map(({value: title, isVisible}, index) =>
            <Card
                clickCallback={flipClick({cardIndex: index, playerName})}
                key={index}
                index={index}
                title={title}
                playerName={playerName}
                isVisible={isVisible}/>)}
    </div>;

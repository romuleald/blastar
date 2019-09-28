import React from 'react';

export const Card = ({title, isVisible}) => <div className="card">{isVisible ? title : '💀'}</div>;

export const Cards = ({cards}) =>
    <div className="cards">
        {cards.map(({value:title, isVisible}, index) => <Card key={index} title={title} isVisible={isVisible}/>)}
    </div>;

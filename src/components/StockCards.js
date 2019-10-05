import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from '../reducer/players-reducer';
import {Card} from './Cards';

// Waste Card should not come from stock card
export const StockCardsComponent = ({card, totalStockCards}) => <div className="stock-card">
    <h2>Pioche ({totalStockCards}) :</h2>
    {
        card && <Card title={'should be a real card from stock card'}/>
    }
    {
        card && <Card title={card.value} isVisible isWasteCard/>
    }
</div>;

const mapStateToProps = (state) => {
    let {stockCards} = state[PLAYERS];

    const card = stockCards[0];
    const totalStockCards = stockCards.length;
    return {card, totalStockCards};
};

export const StockCard = connect(mapStateToProps)(StockCardsComponent);

import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from '../reducer/players-reducer';
import {Card} from './Cards';

export const StockCardsComponent = ({title, totalStockCards}) => <div className="stock-card">
    <h2>Pioche ({totalStockCards}) :</h2>
    <Card title={title}/>
    <Card title={title} isVisible/>
</div>;

const mapStateToProps = (state) => {
    const title = state[PLAYERS].stockCards[0];
    const totalStockCards = state[PLAYERS].stockCards.length;
    return {title, totalStockCards};
};

export const StockCard = connect(mapStateToProps)(StockCardsComponent);

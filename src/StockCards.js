import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from './players-reducer';
import {Card} from './Players';

export const StockCardsComponent = ({title}) => <div className="stock-card">
    <Card title={title}/>
    <Card title={title} isVisible/>
</div>;

const mapStateToProps = (state) => {
    console.info({state});
    return {title: state[PLAYERS].stockCards[0]};
};

const mapDispatchToProps = (dispatch, {state}) => {
    console.info(state[PLAYERS].stockCards);
    return {stockCard: state[PLAYERS].stockCards};
};

export const StockCard = connect(mapStateToProps, mapDispatchToProps)(StockCardsComponent);

import React from 'react';
import {connect} from 'react-redux';
import {selectStockCards} from '../selectors/gameSelectors';
import {viewFirstStockCard} from '../actionCreators/playerActionCreators';
import {Card} from './Cards';

export const StockCards = ({stockCards, viewStockCard}) => (
    <div className="stock-card">
        <h2>Pioche ({stockCards.length})</h2>
        {stockCards.length && (
            <Card
                title={stockCards[0]}
                actionList={[
                    {label: 'VIEW', onClick: viewStockCard}
                ]} />
        )}
    </div>
);

const mapStateToProps = state => ({
    stockCards: selectStockCards(state)
});

const mapDispatchToProps = dispatch => ({
    viewStockCard: () => dispatch(viewFirstStockCard())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCards);

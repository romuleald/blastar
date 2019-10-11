import React from 'react';
import {connect} from 'react-redux';
import {selectWasteCards} from '../selectors/gameSelectors';
import {Card} from './Cards';
import {viewWasteCardList} from '../actionCreators/playerActionCreators';

const _WasteCards = ({wasteCards, viewCardList}) => (
    <div className="stock-card">
        <h2>Defausse ({wasteCards.length})</h2>
        {wasteCards.length && (
            <Card title={wasteCards[0]} isVisible actionList={[{label: 'VIEW', onClick: viewCardList}]} />
        )}
    </div>
);

const mapStateToProps = state => ({
    wasteCards: selectWasteCards(state)
});

const mapDispatchToProps = dispatch => ({
    viewCardList: () => dispatch(viewWasteCardList())
});

export const WasteCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WasteCards);

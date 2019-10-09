import '../css/cardViewer.css';
import React from 'react';
import {Card} from './Cards';
import classNames from 'clsx';
import {connect} from 'react-redux';
import {hideCardViewer} from '../actionCreators/playerActionCreators';
import {selectCardListToView, selectIsCardViewerVisible} from '../selectors/cardViewerSelectors';

export const CardViewer = ({isCardViewerVisible, cardList = [], hideCardViewerAction}) => (
    <div
        className={classNames({
            'card-viewer': true,
            'card-viewer--visible': isCardViewerVisible
        })}>
        <div className="card-viewer-overlay"></div>
        <div className="card-viewer-card-list">
            {cardList.map(({value}, index) => (
                <div key={index} className="card-viewer-card">
                    <Card title={value} isVisible />
                </div>
            ))}
        </div>
        <button className="card-viewer-card" onClick={hideCardViewerAction}>
            close
        </button>
    </div>
);

const mapStateToProps = state => ({
    isCardViewerVisible: selectIsCardViewerVisible(state),
    cardList: selectCardListToView(state)
});

const mapDispatchToProps = dispatch => ({
    hideCardViewerAction: () => dispatch(hideCardViewer())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardViewer);

import React from 'react';
import {PlayerList} from '../components/Players';
import {StockCards} from '../components/StockCards';
import {WasteCards} from '../components/WasteCards';
import {connect} from 'react-redux';

const _GameBoard = isGameStarted =>
    isGameStarted ? (
        <>
            <div className="stock-cards">
                <StockCards />
                <WasteCards />
            </div>
            <h2>Adversaires</h2>
            <div className="players">
                <PlayerList />
            </div>
        </>
    ) : null;

const mapStateToProps = state => ({
    isGameStarted: state.PLAYERS.isGameStarted
});

export const GameBoard = connect(mapStateToProps)(_GameBoard);

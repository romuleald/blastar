import React from 'react';
import {PlayerList} from './Players';
import {StockCards} from './StockCards';
import {WasteCards} from './WasteCards';

export const GameBoard = () => (
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
);

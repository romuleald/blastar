import React from 'react';
import { PlayerList } from '../components/Players';
import { StockCards } from '../components/StockCards';
import { WasteCards } from '../components/WasteCards';

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

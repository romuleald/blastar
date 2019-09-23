import React from 'react';
import './App.css';
import {addPlayer, startGame} from './players-reducer';
import store from './players-reducer';
import {Player, Players} from './Players';
import {Provider} from 'react-redux';
import {StockCard} from './StockCards';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header>Title/Header</header>
                <input defaultValue="test" type="text" id='newPlayer'/>
                <button onClick={() => {
                    let name = document.getElementById('newPlayer').value;
                    console.info('new', name);
                    store.dispatch(addPlayer({name}));
                }}>Add Player
                </button>
                <button onClick={() => store.dispatch(startGame())}>Start</button>
                <h2>Adversaires</h2>
                <div className="players">
                    <Players state={store.getState()}/>
                </div>
                <div className="stock-cards">
                    <h2>Pioche :</h2>
                    <StockCard state={store.getState()}/>
                </div>
                <Player playerName={'YOU'} cards={['Carte 1']}/>
            </div>
        </Provider>
    );
}

export default App;

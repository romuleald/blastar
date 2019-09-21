import React from 'react';
import './App.css';
import {addPlayer, startGame} from './players-reducer';
import store from './players-reducer';
import {Player, Players} from './Players';
import {Provider} from 'react-redux';

function App() {
    return (
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
                <Provider store={store}><Players players={store.getState()}/></Provider>
            </div>
            <Player playerName={'YOU'} cards={['Carte 1']}/>
        </div>
    );
}

export default App;

import React from 'react';
import './css/main.css';
import {addPunitiveCard, addPlayer, PLAYERS, startGame} from './reducer/players-reducer';
import store from './reducer/players-reducer';
import {Player, Players} from './components/Players';
import {connect, Provider} from 'react-redux';
import {StockCard} from './components/StockCards';

const HelperSelectComponent = ({players}) =>
    <select name="player" id="playerAddCardHelper">
        {Object.keys(players).map((name, index) => {
            return <option key={index} value={name}>{name}</option>;
        })}
    </select>;

const mapStateToProps = (state) => ({players: state[PLAYERS].players});

const HelperSelect = connect(mapStateToProps)(HelperSelectComponent);

function Blaster() {
    return (
        <Provider store={store}>
            <div className="App">
                <header>Title/Header</header>
                <div className="dev-helpers">
                    <h2>Dev Helpers</h2>
                    <div>
                        <h3>Add player</h3>
                        <input defaultValue="test" type="text" id='newPlayer'/>
                        <button onClick={() => {
                            let name = document.getElementById('newPlayer').value;
                            console.info('new', name);
                            store.dispatch(addPlayer({name}));
                        }}>Add Player
                        </button>
                    </div>
                    <div>
                        <h3>Start game</h3>
                        <button onClick={() => store.dispatch(startGame())}>Start</button>
                    </div>
                    <div>
                        <h3>Add card</h3>
                        player
                        <HelperSelect state={store.getState()}/>
                        <button onClick={() => {
                            const name = document.getElementById('playerAddCardHelper').value;
                            store.dispatch(addPunitiveCard({name}));
                        }}>Add
                        </button>
                    </div>
                </div>
                <h2>Adversaires</h2>
                <div className="players">
                    <Players state={store.getState()}/>
                </div>
                <div className="stock-cards">
                    <StockCard state={store.getState()}/>
                </div>
                <Player playerName={'YOU'} cards={['Carte 1']}/>
            </div>
        </Provider>
    );
}

export default Blaster;

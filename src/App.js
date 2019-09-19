import React from 'react';
import './App.css';

const Card = ({title}) =>
    <div className="card">{title}</div>;

const Cards = ({cards}) =>
    <div className="cards">
        {cards.map(title => <Card title={title}/>)}
    </div>;

const Player = ({playerName, cards}) =>
    <li className="player">
        <h3>{playerName}</h3>
        <Cards cards={cards}/>
    </li>;

const Players = ({players}) =>
    <ul>
        {players.map(({playerName, cards}) => <Player playerName={playerName} cards={cards}/>)}
    </ul>;

function App() {
    return (
        <div className="App">
            <header>Title/Header</header>
            <h2>Adversaires</h2>
            <div className="players">
                <Players players={[{playerName: 'kikoo', cards: ['Carte 1', 'Carte 2']}]}/>
            </div>
            <Player playerName={"YOU"} cards={['Carte 1']} />
        </div>
    );
}

export default App;

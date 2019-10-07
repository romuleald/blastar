import './css/main.css';
import React from 'react';
import {addPlayer, startGame} from './actionCreators/gameActionCreators';
import {connect} from 'react-redux';
import HelperSelect from './components/HelperSelect';
import {GameBoard} from './components/GameBoard';
import background from './background.jpg';
import {defaultPlayerName} from './constants/playerConstants';
import CardViewer from './components/CardViewer';

const AddNewPlayer = ({addPlayer}) => {
    const [newPlayerName, setNewPlayerName] = React.useState(defaultPlayerName);
    return (
        <div>
            <h3>Add player</h3>
            <input
                type="text"
                defaultValue={newPlayerName}
                onChange={event => setNewPlayerName(event.target.value)} />
            <button onClick={() => addPlayer(newPlayerName)}>Add Player</button>
        </div>
    );
};

const StartGame = ({startGame}) => (
    <div>
        <h3>Start game</h3>
        <button onClick={() => startGame()}>Start</button>
    </div>
);

const Blaster = ({addPlayer, startGame, isGameStarted}) => { 
    return (
        <div className="App">
            <img className="game-background" src={background} alt="background" />
            <header>Title/Header</header>
            <div className="dev-helpers">
                <h2>Dev Helpers</h2>
                <AddNewPlayer addPlayer={addPlayer} />
                <StartGame startGame={startGame} />
                <HelperSelect />
            </div>
            {isGameStarted && <GameBoard />}
            <CardViewer />
        </div>
    );
};

const mapStateToProps = state => ({
    isGameStarted: state.PLAYERS.isGameStarted
});

const mapDispatchToProps = dispatch => ({
    addPlayer: (playerName) => dispatch(addPlayer({name: playerName})),
    startGame: () => dispatch(startGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Blaster);

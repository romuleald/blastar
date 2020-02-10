import '../css/main.css';
import React from 'react';
import background from '../background.jpg';
import { addPlayer, startGame } from '../actionCreators/gameActionCreators';
import { connect } from 'react-redux';
import { HelperSelect } from '../components/HelperSelect';
import { GameBoard } from './GameBoard';
import { defaultPlayerName } from '../constants/playerConstants';
import { CardViewer } from '../components/CardViewer';

const AddNewPlayer = ({ addPlayerAction }) => {
    const [newPlayerName, setNewPlayerName] = React.useState(defaultPlayerName);
    return (
        <div>
            <h3>Add player</h3>
            <input type="text" defaultValue={newPlayerName} onChange={event => setNewPlayerName(event.target.value)} />
            <button onClick={() => addPlayerAction(newPlayerName)}>Add Player</button>
        </div>
    );
};

const StartGame = ({ startGameAction }) => (
    <div>
        <h3>Start game</h3>
        <button onClick={() => startGameAction()}>Start</button>
    </div>
);

const _Blaster = ({ addPlayerAction, startGameAction, isGameStarted }) => (
    <div className="App">
        <img className="game-background" src={background} alt="background" />
        <header>Title/Header</header>
        <div className="dev-helpers">
            <h2>Dev Helpers</h2>
            <AddNewPlayer addPlayerAction={addPlayerAction} />
            <StartGame startGameAction={startGameAction} />
            <HelperSelect />
        </div>
        {isGameStarted && <GameBoard />}
        <CardViewer />
    </div>
);

const mapStateToProps = state => ({
    isGameStarted: state.PLAYERS.isGameStarted
});

const mapDispatchToProps = dispatch => ({
    addPlayerAction: playerName => dispatch(addPlayer({ name: playerName })),
    startGameAction: () => dispatch(startGame())
});

export const Blaster = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Blaster);

import '../css/main.css';
import React from 'react';
import background from '../background.jpg';
import {addPlayer, startGame} from '../actionCreators/gameActionCreators';
import {connect} from 'react-redux';
import {HelperSelect} from '../components/HelperSelect';
import {defaultPlayerName} from '../constants/playerConstants';
import {CardViewer} from '../components/CardViewer';
import {Redirect} from 'react-router-dom';
import {getRoomId} from '../selectors/gameSelectors';
import {StartJumbotron} from '../components/StartJumboTron';

const AddNewPlayer = ({addPlayerAction}) => {
    const [newPlayerName, setNewPlayerName] = React.useState(defaultPlayerName);
    return (
        <div>
            <h3>Add player</h3>
            <input type="text" defaultValue={newPlayerName} onChange={event => setNewPlayerName(event.target.value)} />
            <button onClick={() => addPlayerAction(newPlayerName)}>Add Player</button>
        </div>
    );
};

const startGameAndRedirect = (startGameAction, roomId) =>
    new Promise(resolve => {
        startGameAction();
        resolve();
    }).then(() => <Redirect to={{pathname: `room/${roomId}`, state: {from: '/'}}} />);

const StartGame = ({roomId, startGameAction}) => (
    <div>
        <h3>Start game</h3>
        <button onClick={() => startGameAndRedirect(startGameAction, roomId)}>Start</button>
    </div>
);

const _Blaster = ({addPlayerAction, startGameAction, roomId}) => (
    <div className="App">
        <img className="game-background" src={background} alt="background" />
        <div className="dev-helpers">
            <h2>Dev Helpers</h2>
            <AddNewPlayer addPlayerAction={addPlayerAction} />
            <StartGame roomId={roomId} startGameAction={startGameAction} />
            <HelperSelect />
        </div>
        <StartJumbotron />
        <CardViewer />
    </div>
);

const mapStateToProps = state => ({
    roomId: getRoomId(state)
});

const mapDispatchToProps = dispatch => ({
    addPlayerAction: playerName => dispatch(addPlayer({name: playerName})),
    startGameAction: () => dispatch(startGame())
});

export const Blaster = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Blaster);

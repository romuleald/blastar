import React from 'react';
import {connect} from 'react-redux';
import {PlayerCardList} from './Cards';
import {selectPlayerList} from '../selectors/playerSelectors';
import {endPlayerTurn} from '../actionCreators/playerActionCreators';

export const Player = ({playerName, cards, endTurn}) => (
    <li className="player">
        <h3>{playerName}</h3>
        <button onClick={endTurn}>END TURN</button>
        <PlayerCardList playerName={playerName} cards={cards} />
    </li>
);

const _PlayerList = ({playerList, endTurn}) => (
    <ul>
        {playerList.map(({name, cards}) => (
            <Player key={name} playerName={name} cards={cards} endTurn={endTurn} />
        ))}
    </ul>
);

const mapStateToProps = state => ({
    playerList: selectPlayerList(state)
});

const mapDispatchToProps = dispatch => ({
    endTurn: () => dispatch(endPlayerTurn())
});

export const PlayerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PlayerList);

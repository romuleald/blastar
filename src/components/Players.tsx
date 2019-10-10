import React from 'react';
import {connect} from 'react-redux';
import PlayerCardList from './Cards';
import {selectPlayerList} from '../selectors/playerSelectors';

export const Player = ({playerName, cards}) => (
    <li className="player">
        <h3>{playerName}</h3>
        <PlayerCardList playerName={playerName} cards={cards} />
    </li>
);

export const PlayerList = ({playerList}) => (
    <ul>
        {playerList.map(({name, cards}) => (
            <Player key={name} playerName={name} cards={cards} />
        ))}
    </ul>
);

const mapStateToProps = state => ({
    playerList: selectPlayerList(state)
});

export default connect(mapStateToProps)(PlayerList);

import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from '../reducer/players-reducer';
import {Cards} from './Cards';

export const Player = ({playerName, cards}) =>
    <li className="player">
        <h3>{playerName}</h3>
        <Cards cards={cards}/>
    </li>;

export const PlayersComponent = ({state}) =>
    <ul>
        {Object.values(state[PLAYERS].players)
            .map(({name, cards}) =>
                <Player
                    key={name}
                    playerName={name}
                    cards={cards}/>)}
    </ul>;

const mapStateToProps = (state) => ({state});

const mapDispatchToProps = (dispatch, {state}) => state[PLAYERS];

export const Players = connect(mapStateToProps, mapDispatchToProps)(PlayersComponent);

import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from './players-reducer';

export const Card = ({title, isVisible}) => <div className="card">{isVisible ? title : '💀'}</div>;

const Cards = ({cards}) =>
    <div className="cards">
        {cards.map(({value:title, isVisible}, index) => <Card key={index} title={title} isVisible={isVisible}/>)}
    </div>;

export const Player = ({playerName, cards}) =>
    <li className="player">
        <h3>{playerName}</h3>
        <Cards cards={cards}/>
    </li>;

export const PlayersComponent = ({players}) =>
    <ul>
        {Object.values(players)
            .map(({name, cards}) =>
                <Player
                    key={name}
                    playerName={name}
                    cards={cards}/>)}
    </ul>;

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, {state}) => {
    return state[PLAYERS];
};

export const Players = connect(mapStateToProps, mapDispatchToProps)(PlayersComponent);

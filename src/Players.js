import React from 'react';
import {connect} from 'react-redux';
import {PLAYERS} from './players-reducer';

const Card = ({title}) =>
    <div className="card">{title}</div>;

const Cards = ({cards}) =>
    <div className="cards">
        {cards.map((title, index) => <Card key={index} title={title}/>)}
    </div>;

export const Player = ({playerName, cards}) =>
    <li className="player">
        <h3>{playerName}</h3>
        <Cards cards={cards}/>
    </li>;

export const PlayersComponent = ({players}) => {
    console.info(Object.values(players));
    return (<ul>
        {Object.values(players)
            .map(({name, cards}) =>
                <Player
                    key={name}
                    playerName={name}
                    cards={cards}/>)}
    </ul>);
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, ownProps) => {
    console.info({ownProps, dispatch});
    return ownProps.players[PLAYERS];
};

export const Players = connect(mapStateToProps, mapDispatchToProps)(PlayersComponent);

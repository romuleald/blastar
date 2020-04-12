import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Blaster} from './Blaster';
import {GameBoard} from './GameBoard';
import {connect} from 'react-redux';

const _Root = (roomId: number) => (
    <>
        <Switch>
            <Route exact path="/">
                <Blaster />
            </Route>
            <Route path={`room/${roomId}`}>
                <GameBoard />
            </Route>
        </Switch>
    </>
);

const mapStateToProps = state => ({
    roomId: state.PLAYERS.roomId
});

export const Root = connect(mapStateToProps)(_Root);

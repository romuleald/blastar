import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Blaster } from './Blaster';
import { GameBoard } from './GameBoard';
import { connect } from 'react-redux';
import { getRoomId } from '../selectors/gameSelectors';

const _Root = (id: string) => (
    <>
        <Switch>
            <Route path="/" component={Blaster} />
            <Route path={`room/${id}`} component={GameBoard} />
        </Switch>
    </>
);

const mapStateToProps = (store) => ({
    id: getRoomId(store)
});

export const Root = connect(mapStateToProps)(_Root);

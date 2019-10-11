import './css/index.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {Blaster} from './Blaster';
import {makeStore} from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={makeStore()}>
        <Blaster />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// Unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

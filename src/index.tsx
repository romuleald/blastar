import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { Root } from './routes';

ReactDOM.render(
    <Provider store={makeStore()}>
        <Router>
            <Root />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// Unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/serviceWorker.js').then(
                registration => {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                },
                err => {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                }
            );
        });
    }

}
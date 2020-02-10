import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './reducer';
import thunk from 'redux-thunk';
import {gameMiddleware} from './middlewares/gameMiddleware';
import {roomMiddleWare} from './middlewares/roomMiddleware';

const middleware = [thunk, gameMiddleware, roomMiddleWare];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const {createLogger} = require('redux-logger');
	const logger = createLogger({collapsed: true});
	middleware.push(logger);
}

export const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

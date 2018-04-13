import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

let store = {};

export function configureStore (history, initialState = {}) {
    const middlewares = [routerMiddleware(history), thunkMiddleware];

    // Hook for Redux Devtools Extension - see https://github.com/zalmoxisus/redux-devtools-extension
    const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );

    // Hot reloading for reducers (if active)
    if (module.hot) {
        module.hot.accept('./reducers'), () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        };
    }

    return store;
}

import { createStore, compose, applyMiddleware } from "redux";
import initReducers from './reducers'; 
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import middleware from '@middleware';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {};

const persistConfig = {
    key: 'geekmessanger',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['messageReducer', 'chatsReducer'],
 };

export const history = createBrowserHistory();

function initStore() {
    const store = createStore(
        persistReducer(persistConfig, initReducers(history)),
        {},
        compose(
            applyMiddleware(routerMiddleware(history), ...middleware),reduxDevTools,
        ),
    );
    const persistor = persistStore(store);
    return { store, persistor };
 }
 
 export default initStore; 
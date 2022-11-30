import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, reducers } from './';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
    key: 'auth',
    storage,
    blacklist: ['router']
  }
   
  
export default function configureStore(history: History, initialState?: ApplicationState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });


    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    let store =  createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    let persistor = persistStore(store)
  return { store, persistor }
}

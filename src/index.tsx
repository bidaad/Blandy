import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
//import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
//const history = createBrowserHistory({ basename: baseUrl });
const history = require("history").createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.

// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (e) {
//         return undefined;
//     }
// };

// const saveState = (state: any) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         // Ignore write errors;
//     }
// };
// const persistedState = loadState();

const reduxContainer = configureStore(history);//, persistedState);
// store.subscribe(() => {
//     saveState(store.getState());
// });


ReactDOM.render(
    <Provider store={reduxContainer.store}>
        <PersistGate loading={null} persistor={reduxContainer.persistor}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

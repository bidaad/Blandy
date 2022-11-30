import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIUrl } from '../helper/config';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
    edit: WeatherForecast | undefined;
}

export interface WeatherForecast {
    id: string;
    date: string;
    dateTime: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
    isActive:boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}
interface EditWeatherAction {
    type: 'EDIT_WEATHER_FORECASTS';
    edit: WeatherForecast | undefined;
}
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction | EditWeatherAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch( APIUrl + `/WeatherForecast/GetAll`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    },
    requestEdit: (e: any): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appSt = getState();
        var edit = (appSt.weatherForecasts as WeatherForecastsState).forecasts.find(c => c.id === e);
        if (appSt && appSt.weatherForecasts) {
            console.log(e);
            if (e != null) {
                dispatch({ type: 'EDIT_WEATHER_FORECASTS', edit: edit });
            }

        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false,edit:undefined };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState | undefined, incomingAction: Action): WeatherForecastsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true,
                edit: state.edit
            };
        case 'EDIT_WEATHER_FORECASTS':
            return {
                edit: action.edit,
                isLoading: true,
                forecasts: state.forecasts,
                startDateIndex: state.startDateIndex
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false,
                    edit: state.edit
                };
            }
            break;

    }

    return state;
};

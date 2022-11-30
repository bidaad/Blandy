import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface IncrementCountAction { type: string, payload: number, str:string }
export interface DecrementCountAction { type: string , str:string}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: (str:string, num:number) => ({ type: 'INCREMENT_COUNT' + str, payload: num, str: str } as IncrementCountAction),
    decrement: (str:string) => ({ type: 'DECREMENT_COUNT' + str, str:str } as DecrementCountAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    if (state === undefined) {
        return { count: 0 };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INCREMENT_COUNT' + action.str:
            return { count: state.count + (action as IncrementCountAction).payload };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

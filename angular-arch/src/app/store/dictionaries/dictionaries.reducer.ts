import { Dictionaries } from "./dictionaries.models";
import * as fromActions from './dictionaries.actions';

export interface DictionariesState {
    entities: Dictionaries | null;
    loading: boolean;
    error: string;
}

const initialState: DictionariesState = {
    entities: null,
    loading: false,
    error: ''
}

export function reducer(
    state = initialState,
    action: fromActions.All
): DictionariesState {
    switch(action.type) {
        case fromActions.Types.READ: {
            return { ...state, loading: true, error: '' }
        }

        case fromActions.Types.READ_SUCCESS: {
            return { ...state, entities: action.dictionaries, loading: false }
        }

        case fromActions.Types.READ_ERROR: {
            return { ...state, entities: null, loading: false, error: action.error }
        }

        default: {
            return state;
        }
    }
}
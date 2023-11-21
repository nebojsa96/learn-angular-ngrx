import * as fromActions from "./user.actions";
import { User } from "./user.models";

export interface UserState {
    entity: User | null;
    uid: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: false,
    error: null
};

export function reducer(state = initialState, action: fromActions.All): UserState {
    switch(action.type) {
        // Init
        case fromActions.Types.INIT: {
            return { ...state, loading: true }
        }

        case fromActions.Types.INIT_AUTHORIZED: {
            return { ...state, entity: (action as fromActions.InitAuthorized).user, uid: (action as fromActions.InitAuthorized).uid, loading: false, error: null }
        }

        case fromActions.Types.INIT_UNAUTHORIZED: {
            return { ...state, entity: null, loading: false, error: null }
        }

        case fromActions.Types.INIT_ERROR: {
            return { ...state, error: (action as fromActions.InitError).error, loading: false }
        }

        // Sign In
        case fromActions.Types.SIGN_IN_EMAIL: {
            return { ...state, loading: true, error: '' }
        }

        case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
            return { ...state, entity: (action as fromActions.SignInEmailSuccess).user, uid: (action as fromActions.SignInEmailSuccess).uid, loading: false }
        }

        case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
            return { ...state, loading: false, error: (action as fromActions.SignInEmailError).error }
        }

        // Sign Up
        case fromActions.Types.SIGN_UP_EMAIL: {
            return { ...state, loading: true, error: '' };
        }

        case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
            return { ...state, uid: (action as fromActions.SignUpEmailSuccess).uid, loading: false };
        }

        case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
            return { ...state, loading: false, error: (action as fromActions.SignUpEmailError).error };
        }

        // Sign Out
        case fromActions.Types.SIGN_OUT: {
            return { ...state, loading: true, error: '' };
        }

        case fromActions.Types.SIGN_OUT_SUCCESS: {
            return { ...state, entity: null, uid: null, loading: false, error: '' };
        }
        
        case fromActions.Types.SIGN_OUT_ERROR: {
            return { ...state, loading: false, error: (action as fromActions.SignOutError).error };
        }

        default: {
            return state;
        }
    }
} 



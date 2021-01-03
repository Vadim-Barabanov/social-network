import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
    initialized: boolean;
};

let initialState: InitialStateType = {
    initialized: false,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

// ACTION CREATERS
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS;
};
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS,
});

// THUNK CREATERS
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};

export default authReducer;

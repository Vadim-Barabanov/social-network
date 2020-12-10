import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false,
};

const authReducer = (state = initialState, action) => {
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
export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
});

// THUNK CREATERS
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};

export default authReducer;

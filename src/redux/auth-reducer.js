import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        default:
            return state;
    }
};

// ACTION CREATERS
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {
        userId,
        email,
        login,
        isAuth,
    },
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

// THUNK CREATERS
export const getAuthUserData = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    return authAPI.authMe().then((data) => {
        let { id, email, login } = data.data;
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(id, email, login, true));
            console.log("Login");
        }
        dispatch(toggleIsFetching(false));
    });
};

export const login = (email, password, rememberMe = false) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    authAPI.login(email, password, rememberMe).then((data) => {
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message =
                data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(
                stopSubmit("login", {
                    _error: message,
                })
            );
        }
        dispatch(toggleIsFetching(false));
    });
};

export const logout = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    authAPI.logout().then((data) => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
        dispatch(toggleIsFetching(false));
    });
};

export default authReducer;

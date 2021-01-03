import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false as boolean,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        default:
            return state;
    }
};

// ACTION CREATERS
type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA;
    payload: {
        userId: number | null;
        email: string | null;
        login: string | null;
        isAuth: boolean | null;
    };
};
export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
): SetAuthUserDataType => ({
    type: SET_AUTH_USER_DATA,
    payload: {
        userId,
        email,
        login,
        isAuth,
    },
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING;
    isFetching: boolean;
};
export const toggleIsFetching = (
    isFetching: boolean
): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL;
    captchaUrl: string;
};
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl,
});

// THUNK CREATERS
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.authMe();

    if (response.resultCode === 0) {
        let { id, email, login } = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message =
            data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(
            stopSubmit("login", {
                _error: message,
            })
        );
    }
    dispatch(toggleIsFetching(false));
};

export const logout = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
    dispatch(toggleIsFetching(false));
};

const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url));
    // dispatch(stopSubmit("login", { _error: message }));
};

export default authReducer;

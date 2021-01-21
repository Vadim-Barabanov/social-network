import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { ResultCodes, CaptchaResultCode } from "../api/api";
import { InferActionsType, BaseThunkType } from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false as boolean,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};
type InitialStateType = typeof initialState;

const authReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_AUTH_USER_DATA":
            return {
                ...state,
                ...action.payload,
            };
        case "AUTH/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case "AUTH/SET_CAPTCHA_URL":
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        default:
            return state;
    }
};

// ACTION CREATERS
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    setAuthUserData: (
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    ) =>
        ({
            type: "AUTH/SET_AUTH_USER_DATA",
            payload: { userId, email, login, isAuth },
        } as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: "AUTH/TOGGLE_IS_FETCHING",
            isFetching,
        } as const),

    setCaptchaUrl: (captchaUrl: string) =>
        ({
            type: "AUTH/SET_CAPTCHA_URL",
            captchaUrl,
        } as const),
};

// THUNK CREATERS
export type ThunkType = BaseThunkType<ActionsType>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.resultCode === ResultCodes.Success) {
        let { id, email, login } = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const login = (
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === CaptchaResultCode.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
    }
    dispatch(actions.toggleIsFetching(false));
};

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
    dispatch(actions.toggleIsFetching(false));
};

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url));
};

export default authReducer;

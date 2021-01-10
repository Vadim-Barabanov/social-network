import { getAuthUserData } from "./auth-reducer";
import { InferActionsType } from "./redux-store";

let initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;

const authReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

// ACTION CREATERS
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    initializedSuccess: () =>
        ({
            type: "APP/INITIALIZED_SUCCESS",
        } as const),
};

// THUNK CREATERS
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default authReducer;

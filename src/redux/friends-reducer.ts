import { UserType } from "../types/types";
import { InferActionsType } from "./redux-store";
import { BaseThunkType } from "./redux-store";
import { FilterType } from "./users-reducer";
import { usersAPI } from "./../api/users-api";

const initialialState = {
    friends: [] as Array<UserType>,
    filter: {
        term: "",
        friend: null as null | boolean,
    },
};

type InitialStateType = typeof initialialState;

export const friendsReducer = (
    state = initialialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "FRIENDS/SET_FRIENDS": {
            return {
                ...state,
                friends: action.friends,
            };
        }
        case "FRIENDS/SET_FILTER": {
            return {
                ...state,
                filter: action.payload,
            };
        }
        default:
            return state;
    }
};

// AC's
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    setFriends: (friends: Array<UserType>) =>
        ({
            type: "FRIENDS/SET_FRIENDS",
            friends,
        } as const),
    setFilter: (filter: FilterType) =>
        ({ type: "FRIENDS/SET_FILTER", payload: filter } as const),
};

// TC's
type ThunkType = BaseThunkType<ActionsType>;

export const getFriends = (filter: FilterType): ThunkType => async (
    dispatch
) => {
    let data = await usersAPI.getUsers(1, 8, filter.term, true);
    dispatch(actions.setFriends(data.items));
    dispatch(actions.setFilter(filter));
};

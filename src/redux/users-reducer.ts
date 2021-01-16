import { profileAPI } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utilits/object-helpers";
import { UserType } from "../types/types";
import { InferActionsType, BaseThunkType } from "./redux-store";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 8 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
    userStatus: null as string | null,
    filter: {
        term: "",
    },
};

type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: true,
                }),
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: true };
                //     }
                //     return user;
                // }),
            };

        case "USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false,
                }),
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: false };
                //     }
                //     return user;
                // }),
            };

        case "USERS/SET_USERS":
            return {
                ...state,
                users: [...action.users],
            };

        case "USERS/SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case "USERS/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case "USERS/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case "USERS/TOGGLE_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };

        case "USERS/SET_USER_STATUS":
            return {
                ...state,
                userStatus: action.userStatus,
            };

        case "USERS/SET_FILTER":
            return {
                ...state,
                filter: action.payload,
            };

        default:
            return state;
    }
};

// ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    followSuccess: (userId: number) =>
        ({
            type: "USERS/FOLLOW",
            userId,
        } as const),

    unfollowSuccess: (userId: number) =>
        ({
            type: "USERS/UNFOLLOW",
            userId,
        } as const),

    setUsers: (users: Array<UserType>) =>
        ({
            type: "USERS/SET_USERS",
            users,
        } as const),

    setTotalUsersCount: (totalUsersCount: number) =>
        ({
            type: "USERS/SET_TOTAL_USERS_COUNT",
            totalUsersCount,
        } as const),

    setCurrentPage: (currentPage: number) =>
        ({
            type: "USERS/SET_CURRENT_PAGE",
            currentPage,
        } as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: "USERS/TOGGLE_IS_FETCHING",
            isFetching,
        } as const),

    toggleFollowingProgress: (isFollowingInProgress: boolean, userId: number) =>
        ({
            type: "USERS/TOGGLE_FOLLOWING_PROGRESS",
            isFollowingInProgress,
            userId,
        } as const),

    setUserStatusSuccess: (userStatus: string) =>
        ({
            type: "USERS/SET_USER_STATUS",
            userStatus,
        } as const),
    setFilter: (term: string) =>
        ({ type: "USERS/SET_FILTER", payload: { term } } as const),
};

// THUNK CREATORS
type ThunkType = BaseThunkType<ActionsType>;

export const getUsers = (
    currentPage: number,
    pageSize: number,
    term: string
): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize, term);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(term));
    dispatch(actions.toggleIsFetching(false));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await usersAPI.follow(userId);
    if (data.resultCode === 0) dispatch(actions.followSuccess(userId));
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await usersAPI.unfollow(userId);
    if (data.resultCode === 0) dispatch(actions.unfollowSuccess(userId));
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const getUserStatus = (userId: number): ThunkType => async (
    dispatch
) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatusSuccess(data));
};

export default usersReducer;

import { profileAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utilits/object-helpers";
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsType } from "./redux-store";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 8 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
    userStatus: null as string | null,
};

type InitialStateType = typeof initialState;

const usersReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
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

        case "UNFOLLOW":
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

        case "SET_USERS":
            return {
                ...state,
                users: [...action.users],
            };

        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case "TOGGLE_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };

        case "SET_USER_STATUS":
            return {
                ...state,
                userStatus: action.userStatus,
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
            type: "FOLLOW",
            userId,
        } as const),
    unfollowSuccess: (userId: number) =>
        ({
            type: "UNFOLLOW",
            userId,
        } as const),
    setUsers: (users: Array<UserType>) =>
        ({
            type: "SET_USERS",
            users,
        } as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({
            type: "SET_TOTAL_USERS_COUNT",
            totalUsersCount,
        } as const),
    setCurrentPage: (currentPage: number) =>
        ({
            type: "SET_CURRENT_PAGE",
            currentPage, // currentPage: currentPage === currentPage
        } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: "TOGGLE_IS_FETCHING",
            isFetching,
        } as const),
    toggleFollowingProgress: (isFollowingInProgress: boolean, userId: number) =>
        ({
            type: "TOGGLE_FOLLOWING_PROGRESS",
            isFollowingInProgress,
            userId,
        } as const),
    setUserStatusSuccess: (userStatus: string) =>
        ({
            type: "SET_USER_STATUS",
            userStatus,
        } as const),
};

// THUNK CREATORS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUsers = (
    currentPage: number,
    pageSize: number
): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
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

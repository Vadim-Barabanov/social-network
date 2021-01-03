import { profileAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utilits/object-helpers";
import { UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";
const SET_USER_STATUS = "SET_USER_STATUS";

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

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
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

        case UNFOLLOW:
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

        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };

        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.userStatus,
            };

        default:
            return state;
    }
};

// ACTION CREATORS
type FollowSuccessType = {
    type: typeof FOLLOW;
    userId: number;
};
export const followSuccess = (userId: number): FollowSuccessType => ({
    type: FOLLOW,
    userId,
});
type UnfollowSuccessType = {
    type: typeof UNFOLLOW;
    userId: number;
};
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
    type: UNFOLLOW,
    userId,
});
type SetUsersType = {
    type: typeof SET_USERS;
    users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersType => ({
    type: SET_USERS,
    users,
});
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT;
    totalUsersCount: number;
};
export const setTotalUsersCount = (
    totalUsersCount: number
): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
});
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE;
    currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage, // currentPage: currentPage === currentPage
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
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS;
    isFollowingInProgress: boolean;
    userId: number;
};
export const toggleFollowingProgress = (
    isFollowingInProgress: boolean,
    userId: number
): ToggleFollowingProgressType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowingInProgress,
    userId,
});
type SetUserStatusSuccessType = {
    type: typeof SET_USER_STATUS;
    userStatus: string;
};
export const setUserStatusSuccess = (
    userStatus: string
): SetUserStatusSuccessType => ({
    type: SET_USER_STATUS,
    userStatus,
});

// THUNK CREATORS
export const getUsers = (currentPage: number, pageSize: number) => async (
    dispatch: any
) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(false));
};

export const follow = (userId: number) => async (dispatch: any) => {
    // dispatch(toggleIsFetching(true));
    dispatch(toggleFollowingProgress(true, userId));
    let data = await usersAPI.follow(userId);
    if (data.resultCode === 0) dispatch(followSuccess(userId));
    dispatch(toggleFollowingProgress(false, userId));
    // dispatch(toggleIsFetching(false));
};

export const unfollow = (userId: number) => async (dispatch: any) => {
    // dispatch(toggleIsFetching(true));
    dispatch(toggleFollowingProgress(true, userId));
    let data = await usersAPI.unfollow(userId);
    if (data.resultCode === 0) dispatch(unfollowSuccess(userId));
    dispatch(toggleFollowingProgress(false, userId));
    // dispatch(toggleIsFetching(false));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setUserStatusSuccess(data));
};

export default usersReducer;

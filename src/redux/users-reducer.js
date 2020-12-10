import { profileAPI, usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";
const SET_USER_STATUS = "SET_USER_STATUS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    userStatus: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true };
                    }
                    return user;
                }),
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false };
                    }
                    return user;
                }),
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
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotalUsersCount = (count) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: count,
});
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage, // currentPage: currentPage === currentPage
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toggleFollowingProgress = (isFollowingInProgress, userId) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowingInProgress,
    userId,
});
export const setUserStatusSuccess = (userStatus) => ({
    type: SET_USER_STATUS,
    userStatus,
});

// THUNK CREATORS
export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(100));
        dispatch(setCurrentPage(currentPage));
        //dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    });
};

export const follow = (userId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId).then((data) => {
        if (data.resultCode === 0) dispatch(followSuccess(userId));
        dispatch(toggleFollowingProgress(false, userId));
        dispatch(toggleIsFetching(false));
    });
};

export const unfollow = (userId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then((data) => {
        if (data.resultCode === 0) dispatch(unfollowSuccess(userId));
        dispatch(toggleFollowingProgress(false, userId));
        dispatch(toggleIsFetching(false));
    });
};

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI
        .getStatus(userId)
        .then((data) => dispatch(setUserStatusSuccess(data)));
};

export default usersReducer;

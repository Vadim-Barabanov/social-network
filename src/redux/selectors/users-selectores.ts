import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";

export const getUsersArray = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsersArraySS = createSelector(getUsersArray, (users) => {
    // Difficult calculations or functions that returns new object [map, filter, reduce etc..]
    // users takes from simple selector [getUsersArray]
    return users.filter(() => true);
});

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};

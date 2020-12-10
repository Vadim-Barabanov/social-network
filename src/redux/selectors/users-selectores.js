import { createSelector } from "reselect";

const getUsersArray = (state) => state.usersPage.users;
export const getUsersArraySS = createSelector(getUsersArray, (users) => {
    // Difficult calculations or functions that returns new object [map, filter, reduce etc..]
    // users takes from simple selector [getUsersArray]
    return users.filter(() => true);
});

export const getPageSize = (state) => state.usersPage.pageSize;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getTotalUsersCount = (state) => state.usersPage.totalUsersCount;
export const getIsFetching = (state) => state.usersPage.isFetching;
export const getFollowingInProgress = (state) =>
    state.usersPage.followingInProgress;

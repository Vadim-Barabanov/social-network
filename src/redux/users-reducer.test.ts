import usersReducer, { actions } from "./users-reducer";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    userStatus: null,
};

describe("Users reducer test", () => {
    test("Setting total users count should be correct", () => {
        let newState = usersReducer(
            initialState,
            actions.setTotalUsersCount(10)
        );
        expect(newState.totalUsersCount).toBe(10);
    });
});

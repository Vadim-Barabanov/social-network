import usersReducer, { actions, InitialStateType } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: "Vadim 0",
                followed: false,
                photos: { small: null, large: null },
                status: "status 0",
            },
            {
                id: 1,
                name: "Vadim 1",
                followed: false,
                photos: { small: null, large: null },
                status: "status 0",
            },
            {
                id: 2,
                name: "Vadim 2",
                followed: true,
                photos: { small: null, large: null },
                status: "status 2",
            },
            {
                id: 3,
                name: "Vadim 3",
                followed: true,
                photos: { small: null, large: null },
                status: "status 3",
            },
        ],
        pageSize: 8,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        userStatus: null,
        filter: {
            term: "",
            friend: null,
        },
    };
});

test("Follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("Unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3));
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});

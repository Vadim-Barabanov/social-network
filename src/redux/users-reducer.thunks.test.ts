import {
    actions,
    getUsers,
    getUserStatus,
    follow,
    unfollow,
} from "./users-reducer";
import { usersAPI } from "../api/users-api";
import { profileAPI } from "../api/profile-api";
import { APIResponseType, ResultCodes } from "../api/api";

jest.mock("../api/profile-api");
jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
});

const data: APIResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {},
};

const getStatusResponseData: string = "status_response";

const getUsersResponseData = {
    items: [
        {
            id: 1,
            name: "Vadim",
            status: "status_response",
            followed: false,
            photos: { small: null, large: null },
        },
    ],
    totalCount: 1,
    error: "",
};

test("Follow thunk", async () => {
    const thunk = follow(1);
    usersAPIMock.follow.mockReturnValue(Promise.resolve(data));
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowingProgress(true, 1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowingProgress(false, 1)
    );
});

test("Unfollow thunk", async () => {
    const thunk = unfollow(2);
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(data));
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowingProgress(true, 2)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowingProgress(false, 2)
    );
});

test("GetUserStatus thunk", async () => {
    const thunk = getUserStatus(1);
    profileAPIMock.getStatus.mockReturnValue(
        Promise.resolve(getStatusResponseData)
    );
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.setUserStatusSuccess("status_response")
    );
});

test("GetUsers thunk dispatch calledTime", async () => {
    const thunk = getUsers(1, 1, { term: "", friend: null });
    usersAPIMock.getUsers.mockReturnValue(
        Promise.resolve(getUsersResponseData)
    );
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(6);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleIsFetching(true)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        2,
        actions.setUsers([
            {
                id: 1,
                name: "Vadim",
                status: "status_response",
                followed: false,
                photos: { small: null, large: null },
            },
        ])
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.setTotalUsersCount(1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        5,
        actions.setFilter({ term: "", friend: null })
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        6,
        actions.toggleIsFetching(false)
    );
});

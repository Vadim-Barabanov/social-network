const ADD_FRIEND = "ADD_FRIEND";

type FriendType = {
    id: number;
    name: string;
    link: string;
};
let initialState = {
    friendsList: [
        { id: 1, name: "Vadim", link: "/dialogs/1" },
        { id: 2, name: "Julia", link: "/dialogs/2" },
        { id: 3, name: "Alex", link: "/dialogs/3" },
        { id: 4, name: "Elon", link: "/dialogs/4" },
    ] as Array<FriendType>,
};
type InitialStateType = typeof initialState;
const sidebarReducer = (
    state = initialState,
    action: any
): InitialStateType => {
    switch (action) {
        case ADD_FRIEND:
            state.friendsList.push({
                id: 5,
                name: action.friendName,
                link: action.friendLink,
            });
            return state;
        default:
            return state;
    }
};

export default sidebarReducer;

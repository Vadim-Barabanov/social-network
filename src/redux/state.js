import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, text: "It's my first post!", likesCount: 12 },
                { id: 2, text: "What's up guiz?", likesCount: 42 },
            ],
            newPostText: "",
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: "Vadim" },
                { id: 2, name: "Julia" },
                { id: 3, name: "Alex" },
                { id: 4, name: "Elon" },
            ],
            messages: [
                { id: 1, text: "Hi", isMine: true },
                { id: 2, text: "How are you?", isMine: false, from: "Vadim" },
                { id: 3, text: "I'm waiting for you rigth now.", isMine: true },
                {
                    id: 4,
                    text: "Some Special Text",
                    isMine: false,
                    from: "Elon",
                },
            ],
            newMessageText: "",
        },

        sidebar: {
            friendsList: [
                { id: 1, name: "Vadim", link: "/dialogs/1" },
                { id: 2, name: "Julia", link: "/dialogs/2" },
                { id: 3, name: "Alex", link: "/dialogs/3" },
                { id: 4, name: "Elon", link: "/dialogs/4" },
            ],
        },
    },

    getState() {
        return this._state;
    },

    _callSubscriber() {
        console.log("State changed!");
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(
            this._state.profilePage,
            action
        );
        this._state.dialogsPage = dialogsReducer(
            this._state.dialogsPage,
            action
        );

        this._callSubscriber(this._state);
    },
};

export default store;

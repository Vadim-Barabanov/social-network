const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 5,
                text: state.newMessageText,
                isMine: true,
            };
            state.messages.push(newMessage);
            state.newMessageText = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
};

export const addMessageCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageTextCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text,
});

export default dialogsReducer;

const ADD_MESSAGE = "ADD-MESSAGE";

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
            from: "Vadim",
        },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { id: 5, text: action.messageText, isMine: true },
                ],
            };
        }
        default:
            return state;
    }
};

export const addMessage = (messageText) => ({ type: ADD_MESSAGE, messageText });

export default dialogsReducer;

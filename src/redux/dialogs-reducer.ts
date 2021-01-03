const ADD_MESSAGE = "ADD-MESSAGE";

type DialogType = {
    id: number;
    name: string;
};
type MessageType = {
    id: number;
    text: string;
    isMine: boolean;
};
let initialState = {
    dialogs: [
        { id: 1, name: "Vadim" },
        { id: 2, name: "Julia" },
        { id: 3, name: "Alex" },
        { id: 4, name: "Elon" },
    ] as Array<DialogType>,
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
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
    state = initialState,
    action: any
): InitialStateType => {
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

type AddMessageType = {
    type: typeof ADD_MESSAGE;
    messageText: string;
};
export const addMessage = (messageText: string): AddMessageType => ({
    type: ADD_MESSAGE,
    messageText,
});

export default dialogsReducer;

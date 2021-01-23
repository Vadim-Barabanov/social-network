import { InferActionsType } from "./redux-store";

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
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "DIALOGS/ADD_MESSAGE": {
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

// ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    addMessage: (messageText: string) =>
        ({
            type: "DIALOGS/ADD_MESSAGE",
            messageText,
        } as const),
};

export default dialogsReducer;

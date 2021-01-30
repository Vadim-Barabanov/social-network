import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { BaseThunkType, InferActionsType } from './redux-store';

let initialState = {
    messages: [] as ChatMessageType[],
};
type InitialStateType = typeof initialState;

const chatReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            };
        default:
            return state;
    }
};

// ACTION CREATERS
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({
            type: 'CHAT/MESSAGES_RECEIVED',
            payload: { messages },
        } as const),
};

// THUNK CREATERS
export type ThunkType = BaseThunkType<ActionsType>;

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }

    return _newMessagesHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch));
    chatAPI.start();
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message);
};

export default chatReducer;

import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType, TStatus } from '../api/chat-api';
import { BaseThunkType, InferActionsType } from './redux-store';

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as TStatus,
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
        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status,
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
    statusChanged: (status: TStatus) =>
        ({
            type: 'CHAT/STATUS_CHANGED',
            payload: { status },
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

let _statusChangedHandler: ((status: TStatus) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }
    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.start();
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(
        'messages-received',
        newMessagesHandlerCreator(dispatch)
    );
    chatAPI.unsubscribe(
        'status-changed',
        statusChangedHandlerCreator(dispatch)
    );
    chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message);
};

export default chatReducer;

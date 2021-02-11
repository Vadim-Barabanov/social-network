const subscribers = {
    'messages-received': [] as TMessagesReceivedSub[],
    'status-changed': [] as TStatusChangedSub[],
};

let ws: WebSocket | null = null;

const handleCloseChannel = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: any) => {
    let newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach((s) => s(newMessages));
};

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error('REFRESH PAGE');
};

const cleanUp = () => {
    ws?.removeEventListener('close', handleCloseChannel);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
};

const notifySubscribersAboutStatus = (status: TStatus) => {
    subscribers['status-changed'].forEach((s) => s(status));
};

function createChannel() {
    cleanUp();
    ws?.close();

    ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    );
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', handleCloseChannel);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(
        eventName: TEvent,
        callback: TMessagesReceivedSub | TStatusChangedSub
    ) {
        //@ts-ignore
        subscribers[eventName].push(callback);
    },

    unsubscribe(
        eventName: TEvent,
        callback: TMessagesReceivedSub | TStatusChangedSub
    ) {
        //@ts-ignore
        subscribers[eventName] = subscribers['messages-received'].filter(
            (s) => s !== callback
        );
    },

    sendMessage(message: string) {
        ws?.send(message);
    },
};

type TMessagesReceivedSub = (messages: ChatMessageType[]) => void;
type TStatusChangedSub = (status: TStatus) => void;
type TEvent = 'messages-received' | 'status-changed';
export type TStatus = 'pending' | 'ready' | 'error';

export type ChatMessageType = {
    userName: string;
    userId: number;
    photo: string;
    message: string;
};

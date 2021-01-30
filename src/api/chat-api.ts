let subscribers: SubscriberType[] = [];

let ws: WebSocket | null = null;

const handleCloseChannel = () => {
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: any) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach((s) => s(newMessages));
};

function createChannel() {
    // ws?.removeEventListener('close', handleCloseChannel);
    // ws?.close();

    ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    );
    ws.addEventListener('close', handleCloseChannel);
    ws.addEventListener('message', messageHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener('close', handleCloseChannel);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    },
    subscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers.push(callback);
    },

    unsubscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers = subscribers.filter((s) => s !== callback);
    },

    sendMessage(message: string) {
        ws?.send(message);
    },
};

type SubscriberType = (messages: ChatMessageType[]) => void;

export type ChatMessageType = {
    userName: string;
    userId: number;
    photo: string;
    message: string;
};

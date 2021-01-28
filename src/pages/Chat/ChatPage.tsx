import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { CustomTextField } from "../../components/common/Forms/Forms";

export type ChatMessageType = {
    userName: string;
    userId: number;
    photo: string;
    message: string;
};

const ChatPage: FC = () => {
    return <Chat />;
};

const Chat: FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;

        const handleCloseChannel = () => {
            setTimeout(createChannel, 3000);
        };
        function createChannel() {
            ws?.removeEventListener("close", handleCloseChannel);
            ws?.close();

            ws = new WebSocket(
                "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
            );
            ws.addEventListener("close", handleCloseChannel);
            setWs(ws);
        }
        createChannel();

        return () => {
            ws.removeEventListener("close", handleCloseChannel);
            ws.close();
        };
    }, []);

    return (
        <div>
            <Messages ws={ws} />
            <MessagesForm ws={ws} />
        </div>
    );
};

const MessagesForm: FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
        "pending"
    );

    useEffect(() => {
        let handleOpenChannel = () => {
            setReadyStatus("ready");
        };
        ws?.addEventListener("open", handleOpenChannel);
        return () => {
            ws?.removeEventListener("close", handleOpenChannel);
        };
    }, [ws]);

    return (
        <Formik
            initialValues={{ messageText: "" }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                ws?.send(values.messageText);
                setSubmitting(false);
                resetForm();
            }}>
            {({ isSubmitting }) => (
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <CustomTextField
                        style={{ margin: "20px 0" }}
                        name="messageText"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={
                            isSubmitting ||
                            readyStatus !== "ready" ||
                            ws === null
                        }>
                        Send
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

const Messages: FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        const handleMessageChannel = (e: any) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };

        ws?.addEventListener("message", handleMessageChannel);
        return () => ws?.removeEventListener("message", handleMessageChannel);
    }, [ws]);

    return (
        <div
            style={{
                height: "600px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}>
            {messages.map((data: any, index: number) => (
                <Message data={data} key={index} />
            ))}
        </div>
    );
};

const Message: FC<any> = ({ data }) => {
    return (
        <div
            style={{
                margin: "10px 0",
                backgroundColor: "var(--secondary-bg-color)",
                padding: "10px 20px",
                borderRadius: "10px",
            }}>
            <img
                style={{ width: "50px", borderRadius: "50%" }}
                src={data.photo}
            />{" "}
            <b>{data.userName} </b>
            <b>#{data.userId}</b>
            <div>{data.message}</div>
        </div>
    );
};

export default ChatPage;

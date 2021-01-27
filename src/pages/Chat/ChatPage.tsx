import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { CustomTextField } from "../../components/common/Forms/Forms";

const ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

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
    return (
        <div>
            <Messages />
            <MessagesForm />
        </div>
    );
};

const MessagesForm: FC = () => {
    return (
        <Formik
            initialValues={{ messageText: "" }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                ws.send(values.messageText);
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
                        disabled={isSubmitting}>
                        Send
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

const Messages: FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        ws.addEventListener("message", (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        });
    }, []);

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
                padding: "10px",
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

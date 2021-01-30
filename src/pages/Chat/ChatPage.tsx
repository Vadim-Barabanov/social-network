import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { Form, Formik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTextField } from '../../components/common/Forms/Forms';
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

const useStyles = makeStyles(() => ({
    messages: {
        height: '600px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

const ChatPage: FC = () => {
    return <Chat />;
};

const Chat: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <div>
            <Messages />
            <MessagesForm />
        </div>
    );
};

const MessagesForm: FC = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ messageText: '' }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                dispatch(sendMessage(values.messageText));
                setSubmitting(false);
                resetForm();
            }}>
            {({ isSubmitting }) => (
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <CustomTextField
                        name="messageText"
                        style={{ width: '300px', margin: '20px 0' }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        endIcon={<SendIcon />}
                        disabled={isSubmitting}>
                        Send
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

const Messages: FC = () => {
    const classes = useStyles();
    const messages = useSelector((state: AppStateType) => state.chat.messages);

    // TODO: change key value to smth more stable than [index]
    return (
        <Container maxWidth="sm" className={classes.messages}>
            {messages.map((data: any, index: number) => (
                <Message data={data} key={index} />
            ))}
        </Container>
    );
};

const Message: FC<any> = ({ data }) => {
    return (
        <div
            style={{
                margin: '10px 0',
                backgroundColor: 'var(--secondary-bg-color)',
                padding: '10px 20px',
                borderRadius: '10px',
            }}>
            <img
                style={{ width: '50px', borderRadius: '50%' }}
                src={data.photo}
                alt="user"
            />{' '}
            <b>{data.userName} </b>
            <b>#{data.userId}</b>
            <div>{data.message}</div>
        </div>
    );
};

export default ChatPage;

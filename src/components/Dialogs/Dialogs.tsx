import React, { FC } from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import { Formik, Form, FormikErrors } from 'formik';
import { AppStateType } from '../../redux/redux-store';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './../../redux/dialogs-reducer';
import { Button } from '@material-ui/core';
import { CustomTextField } from '../common/Forms/Forms';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import SendIcon from '@material-ui/icons/Send';

type FormValues = {
    messageText: string;
};

const validation = (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.messageText) {
        if (/[ \t]/.test(values.messageText)) {
            errors.messageText = 'error';
        }
    }

    return errors;
};

const MessagesForm = () => {
    const dispatch = useDispatch();

    const submit = (values: FormValues, { resetForm, setSubmitting }: any) => {
        setSubmitting(true);
        if (values.messageText.length !== 0) {
            dispatch(actions.addMessage(values.messageText));
        }
        resetForm();
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ messageText: '' }}
            validate={validation}
            onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className={s.messageForm}>
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

type PropsType = {};

const Dialogs: FC<PropsType> = () => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage);

    let messagesElements = dialogsPage.messages.map((item: any) => (
        <Message
            from={item.from}
            isMine={item.isMine}
            text={item.text}
            key={item.id}
        />
    ));
    return (
        <div className={s.wrapper}>
            <div className={s.messageItems}>{messagesElements}</div>
            <MessagesForm />
        </div>
    );
};
export default withAuthRedirect(Dialogs);

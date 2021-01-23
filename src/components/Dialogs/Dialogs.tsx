import React, { FC } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Form, FormikErrors } from "formik";
import { AppStateType } from "../../redux/redux-store";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./../../redux/dialogs-reducer";
import { Button } from "@material-ui/core";
import { CustomTextField } from "../common/Forms/Forms";

type FormValues = {
    messageText: string;
};

const validation = (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.messageText) {
        if (/[ \t]/.test(values.messageText)) {
            errors.messageText = "error";
        }
    }

    return errors;
};

const MessagesForm = () => {
    const dispatch = useDispatch();

    const submit = (values: FormValues, { resetForm, setSubmitting }: any) => {
        setSubmitting(true);
        dispatch(actions.addMessage(values.messageText));
        resetForm();
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ messageText: "" }}
            validate={validation}
            onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form className={s.messageForm}>
                    <CustomTextField
                        multiline
                        variant="outlined"
                        name="messageText"
                        style={{ width: "300px" }}
                    />
                    <div style={{ margin: "15px 0" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}>
                            Send
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

type PropsType = {};

const Dialogs: FC<PropsType> = () => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage);

    let dialogElements = dialogsPage.dialogs.map((item: any) => (
        <DialogItem name={item.name} id={item.id} key={item.id} />
    ));

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
            <div className={s.dialogItems}>{dialogElements}</div>
            <div className={s.messageItems}>{messagesElements}</div>
            <MessagesForm />
        </div>
    );
};
export default Dialogs;

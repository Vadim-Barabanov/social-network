import React, { FC } from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Field, Form, FormikErrors, ErrorMessage } from "formik";
import { AppStateType } from "../../redux/redux-store";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./../../redux/dialogs-reducer";

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

    const submit = (values: FormValues, act: any) => {
        dispatch(actions.addMessage(values.messageText));
        act.setFieldValue("messageText", "");
    };

    return (
        <Formik
            initialValues={{ messageText: "" }}
            validate={validation}
            onSubmit={submit}>
            <Form className={styles.inputForm}>
                <Field
                    component="textarea"
                    type="text"
                    name={"messageText"}
                    className={styles.inputFormTextarea}
                    style={{
                        resize: "none",
                        borderRadius: "10px",
                        border: "none",
                        alignSelf: "center",
                        width: "300px",
                        height: "50px",
                        padding: "5px",
                        marginBottom: "15px",
                    }}
                />
                <ErrorMessage name="messageText" component="div" />
                <button type="submit" className={styles.inputFormBtn}>
                    Send
                </button>
            </Form>
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
        <div className={styles.wrapper}>
            <div className={styles.dialogItems}>{dialogElements}</div>
            <div className={styles.messageItems}>{messagesElements}</div>
            <MessagesForm />
        </div>
    );
};
export default Dialogs;

import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { FormCreator } from "../FormControls/FormControls";
import { required, maxLenght } from "../../utilits/validators";

const maxLenghtValidator = maxLenght(3000);
const Textarea = FormCreator("textarea");

const MessagesForm = (props) => {
    return (
        <form className={styles.inputForm} onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={"messageText"}
                    validate={[required, maxLenghtValidator]}
                    className={styles.inputFormTextarea}
                    placeholder={"Type..."}
                />
            </div>
            <div>
                <button className={styles.inputFormBtn}>Send</button>
            </div>
        </form>
    );
};
const MessagesReduxForm = reduxForm({ form: "messages" })(MessagesForm);

const Dialogs = (props) => {
    let dialogElements = props.dialogsPage.dialogs.map((item) => (
        <DialogItem name={item.name} id={item.id} key={item.id} />
    ));

    let messagesElements = props.dialogsPage.messages.map((item) => (
        <Message
            from={item.from}
            isMine={item.isMine}
            text={item.text}
            key={item.id}
        />
    ));

    const onSubmit = (data) => {
        props.addMessage(data.messageText);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogItems}>{dialogElements}</div>

            <div className={styles.messageItems}>{messagesElements}</div>
            <MessagesReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default Dialogs;

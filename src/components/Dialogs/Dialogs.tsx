import React, { FC } from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { FormCreator } from "../FormControls/FormControls";
import { required, maxLenght } from "../../utilits/validators";
import { InitialStateType } from "../../redux/dialogs-reducer";

const maxLenghtValidator = maxLenght(3000);
const Textarea = FormCreator("textarea");

const MessagesForm = (props: any) => {
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

type PropsType = {
    dialogsPage: InitialStateType;
    addMessage: (messageText: string) => void;
};

const Dialogs: FC<PropsType> = (props) => {
    let dialogElements = props.dialogsPage.dialogs.map((item: any) => (
        <DialogItem name={item.name} id={item.id} key={item.id} />
    ));

    let messagesElements = props.dialogsPage.messages.map((item: any) => (
        <Message
            from={item.from}
            isMine={item.isMine}
            text={item.text}
            key={item.id}
        />
    ));

    const onSubmit = (data: any) => {
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

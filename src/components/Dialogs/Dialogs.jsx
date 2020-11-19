import React from "react";
import DialogsStyle from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let addMessage = () => {
        props.addMessage();
    };

    let onMessageChange = (elem) => {
        let text = elem.target.value;
        props.updateNewMessageText(text);
    };

    let state = props.dialogsPage;

    let dialogElements = state.dialogs.map((item) => (
        <DialogItem name={item.name} id={item.id} />
    ));
    let messagesElements = state.messages.map((item) => (
        <Message from={item.from} isMine={item.isMine} text={item.text} />
    ));

    return (
        <div className={DialogsStyle.wrapper}>
            <div className={DialogsStyle.dialogItems}>{dialogElements}</div>

            <div className={DialogsStyle.messageItems}>
                {messagesElements}
                <div className={DialogsStyle.input__box}>
                    <textarea
                        onChange={onMessageChange}
                        value={state.newMessageText}
                        className={DialogsStyle.input__text}
                    ></textarea>
                    <button
                        onClick={addMessage}
                        className={DialogsStyle.input__btn}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;

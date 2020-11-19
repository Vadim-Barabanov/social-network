import React from 'react';
import DialogsStyle from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

let dialogs = [
    {id: 1, name: "Vadim"},
    {id: 2, name: "Julia"},
    {id: 3, name: "Alex"},
    {id: 4, name: "Elon"}
];


let  messages = [
    {id: 1, text: "Hi"},
    {id: 2, text: "How are you?"},
    {id: 3, text: "I'm waiting for you rigth now."},
    {id: 4, text: "Some Special Text"}
];

let dialogElements = dialogs.map(item => <DialogItem name={item.name} id={item.id} />);
let messagesElements = messages.map(item => <Message text={item.text} />);

const Dialogs = () => {
    return (
        <div className={DialogsStyle.wrapper}>
            <div className={DialogsStyle.dialogItems}>
                {dialogElements}
            </div>
            <div className={DialogsStyle.messageItems}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;

import React from 'react';
import DialogsStyle from './../Dialogs.module.css';

const Message = (props) => {
    if(props.isMine) return (
        <div className={DialogsStyle.message__mymsg + ' ' + DialogsStyle.message}>
            <span className={DialogsStyle.message__item}>{props.text}</span>
        </div>
    ); else  return (
        <div className={DialogsStyle.message + ' ' + DialogsStyle.message__item}>
                <span className={DialogsStyle.message__name}>{props.from}</span>
                <span>{props.text}</span>
        </div>
    );
}

export default Message;

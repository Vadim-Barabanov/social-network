import React, { FC } from "react";
import s from "./../Dialogs.module.css";

type PropsType = {
    isMine: boolean;
    text: string;
    from: string;
};

const Message: FC<PropsType> = (props) => {
    return props.isMine ? (
        <div className={s.message__mymsg + " " + s.message}>
            <span className={s.message__item}>{props.text}</span>
        </div>
    ) : (
        <div className={s.message + " " + s.message__item}>
            <span className={s.message__name}>{props.from}</span>
            <span>{props.text}</span>
        </div>
    );
};

export default Message;

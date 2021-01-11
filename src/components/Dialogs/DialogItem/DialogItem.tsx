import React, { FC } from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number;
    name: string;
};

const DialogItem: FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.item}>
            <NavLink to={path} className={s.item} activeClassName={s.active}>
                <img alt="user" className={s.item__img} src="#" />
                <span className={s.item__name}>{props.name}</span>
            </NavLink>
        </div>
    );
};

export default DialogItem;

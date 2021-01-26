import React, { FC } from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import img from "../../../assets/images/userMale.png";

type PropsType = {
    id: number;
    name: string;
};

const DialogItem: FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div>
            <NavLink to={path} className={s.item} activeClassName={s.active}>
                <img alt="user" className={s.item__img} src={img} />
                <span className={s.item__name}>{props.name}</span>
            </NavLink>
        </div>
    );
};

export default DialogItem;

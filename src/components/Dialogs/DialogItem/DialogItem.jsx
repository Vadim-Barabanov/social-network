import React from 'react';
import DialogsStyle from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={DialogItem.item}>
            <NavLink to={path} className={DialogsStyle.item} activeClassName={DialogsStyle.active}>
                <img className={DialogsStyle.item__img} src="#" />
                <span className={DialogsStyle.item__name}>{props.name}</span>
            </NavLink> 
        </div>
    )
}

export default DialogItem;

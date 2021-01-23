import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const Navigation: FC = () => {
    return (
        <div className={style.wrapper}>
            <nav className={style.navbar}>
                <div className={style.item}>
                    <NavLink exact to="/profile" activeClassName={style.active}>
                        <i className="fas fa-user-circle"></i>
                        <span className={style.link__text}>Profile</span>
                    </NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/dialogs" activeClassName={style.active}>
                        <i className="fas fa-envelope"></i>
                        <span className={style.link__text}>Messages</span>
                    </NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/users" activeClassName={style.active}>
                        <i className="fas fa-search"></i>
                        <span className={style.link__text}>Search</span>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};
export default Navigation;

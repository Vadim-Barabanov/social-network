import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import style from "./Heading.module.css";

type PropsType = {};

export const Heading: FC<PropsType> = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const userId = useSelector((state: AppStateType) => state.auth.userId);
    const login = useSelector((state: AppStateType) => state.auth.login);

    const dispatch = useDispatch();

    return (
        <header className={style.heading}>
            <h1>
                <span className={style.heading__text}>
                    <span className={style.headingHeaderText}>{"Guiz:"}</span>
                    <span className={style.headingSubtext}>
                        {"social network for developers"}
                    </span>
                    <i className="far fa-heart"></i>
                </span>
            </h1>
            <div className={style.loginBlock}>
                {isAuth ? (
                    <>
                        <NavLink
                            className={style.loginName}
                            to={`/profile/${userId}`}>
                            <i className="fas fa-user"></i>
                            <span className={style.loginNameText}>
                                {login && login.toUpperCase()}
                            </span>
                        </NavLink>
                        <span
                            className={style.logout__box}
                            onClick={() => dispatch(logout())}>
                            <span className={style.logout__text}>Logout</span>
                            <i className="fas fa-sign-out-alt"></i>
                        </span>
                    </>
                ) : (
                    <NavLink className={style.login__box} to={"/login"}>
                        <span className={style.login__text}>Login</span>
                        <i className="fas fa-sign-in-alt"></i>
                    </NavLink>
                )}
            </div>
        </header>
    );
};

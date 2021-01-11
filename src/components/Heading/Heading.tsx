import React, { FC } from "react";
import style from "./Heading.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
    isAuth: boolean;
    userId: number | null;
    login: string | null;
    logout: () => void;
};

const Heading: FC<PropsType> = (props) => {
    const logout = () => {
        props.logout();
    };

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
                {props.isAuth ? (
                    <>
                        <NavLink
                            className={style.loginName}
                            to={`/profile/${props.userId}`}>
                            <i className="fas fa-user"></i>
                            <span className={style.loginNameText}>
                                {props.login && props.login.toUpperCase()}
                            </span>
                        </NavLink>
                        <span className={style.logout__box} onClick={logout}>
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

export default Heading;

import React from "react";
import style from "./Heading.module.css";
import { NavLink } from "react-router-dom";

const Heading = (props) => {
    const logout = () => {
        props.logout();
    };

    return (
        <header className={style.heading}>
            <h1>
                <i class="far fa-heart"></i>
                <span className={style.heading__text}>
                    Guiz: social network.
                </span>
            </h1>
            <div className={style.loginBlock}>
                {props.isAuth ? (
                    <>
                        {props.email}
                        <span className={style.logout__box} onClick={logout}>
                            <span className={style.logout__text}>Logout</span>
                            <i class="fas fa-sign-out-alt"></i>
                        </span>
                    </>
                ) : (
                    <NavLink className={style.login__box} to={"/login"}>
                        <span className={style.login__text}>Login</span>
                        <i class="fas fa-sign-in-alt"></i>
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Heading;

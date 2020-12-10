import React from "react";
import HeadingStyle from "./Heading.module.css";
import { NavLink } from "react-router-dom";

const Heading = (props) => {
    const logout = () => {
        props.logout();
    };

    return (
        <header className={HeadingStyle.heading}>
            <h1>Guiz: social network.</h1>
            <div className={HeadingStyle.loginBlock}>
                {props.isAuth ? (
                    <>
                        {props.email}
                        <span onClick={logout}>Logout</span>
                    </>
                ) : (
                    <NavLink to={"/login"}>Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Heading;

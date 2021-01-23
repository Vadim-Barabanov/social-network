import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import style from "./Heading.module.css";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

type PropsType = {};

export const Heading: FC<PropsType> = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
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
                        <span className={style.loginName}>
                            <i className="fas fa-user"></i>
                            <span className={style.loginNameText}>
                                {login && login.toUpperCase()}
                            </span>
                        </span>
                        <Button
                            size="small"
                            color="secondary"
                            style={{ marginLeft: "10px" }}
                            variant="contained"
                            onClick={() => dispatch(logout())}>
                            Logout{" "}
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" endIcon={<ExitToAppIcon />}>
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={"/login"}>
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

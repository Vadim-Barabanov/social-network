import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/redux-store";

export const withAuthRedirect = (Component: React.ComponentType): FC<any> => (
    props
) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    if (!isAuth) return <Redirect to={"/login"} />;
    return <Component {...props} />;
};

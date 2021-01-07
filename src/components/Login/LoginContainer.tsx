import React, { FC } from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const LoginContainer: FC<PropsType> = (props) => {
    return <Login {...props} />;
};

type OwnPropsType = {};

type MapDispatchPropsType = {
    login: (
        email: string,
        password: string,
        rememberMe: boolean,
        captchaUrl: string | null
    ) => void;
};

type MapStatePropsType = {
    isAuth: boolean;
    isFetching: boolean;
    captchaUrl: string | null;
};

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        captchaUrl: state.auth.captchaUrl,
    };
};

export default connect<
    MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    AppStateType
>(mapStateToProps, {
    login,
})(LoginContainer);

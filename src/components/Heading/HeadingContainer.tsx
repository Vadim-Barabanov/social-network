import React, { FC } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import Heading from "./Heading";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
    isAuth: boolean;
    login: string | null;
    logout: () => Promise<void>;
    userId: number | null;
};

const HeadingContainer: FC<PropsType> = (props) => {
    return <Heading {...props} />;
};

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
});

export default connect(mapStateToProps, {
    logout,
})(HeadingContainer);

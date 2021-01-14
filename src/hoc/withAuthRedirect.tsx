import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type PropsType = ReturnType<typeof mapStateToProps>;

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to={"/login"} />;
            return <Component {...this.props} />;
        }
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(
        RedirectComponent
    );
    return ConnectedRedirectComponent;
};

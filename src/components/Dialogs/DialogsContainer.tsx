import React from "react";
import Dialogs from "./Dialogs";
import { actions } from "./../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addMessage: actions.addMessage,
    }),
    withAuthRedirect
)(Dialogs);

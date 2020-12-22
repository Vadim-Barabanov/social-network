import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import Preloader from "../common/preloader/Preloader";
import Heading from "./Heading";

const HeadingContainer = (props) => {
    return (
        <>
            {props.isFetching ? <Preloader /> : null}
            <Heading {...props} />
        </>
    );
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
});

export default connect(mapStateToProps, {
    logout,
})(HeadingContainer);

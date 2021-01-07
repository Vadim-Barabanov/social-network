import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import Preloader from "../common/preloader/Preloader";
import Heading from "./Heading";

// type PropsType = {
//     isAuth: boolean;
//     login: string;
//     logout: any;
//     userId: number | null;
//     isFetching: boolean;
// };

const HeadingContainer = (props) => {
    return (
        <>
            {props.isFetching ? <Preloader /> : null}
            <Heading {...props} />
        </>
    );
};

// type OwnPropsType = {};

// type MapDispatchPropsType = {
//     logout: () => Promise<void>;
// };

// type MapStatePropsType = {
//     isAuth: boolean;
//     login: string | null;
//     userId: number | null;
// };

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
});

export default connect(mapStateToProps, {
    logout,
})(HeadingContainer);

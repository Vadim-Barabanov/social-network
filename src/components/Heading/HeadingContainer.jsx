import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import Preloader from "../common/preloader/Preloader";
import Heading from "./Heading";

class HeadinContainer extends React.Component {
    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Heading {...this.props} />
            </>
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
});

export default connect(mapStateToProps, {
    logout,
})(HeadinContainer);

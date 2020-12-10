import React from "react";
import Profile from "./Profile.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    setUserProfile,
    setStatus,
    updateStatus,
} from "../../redux/profile-reducer";
import { compose } from "redux";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.setUserProfile(userId);
        this.props.setStatus(userId);
    }

    render() {
        return <Profile {...this.props} />;
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
});

export default compose(
    connect(mapStateToProps, { setUserProfile, setStatus, updateStatus }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);

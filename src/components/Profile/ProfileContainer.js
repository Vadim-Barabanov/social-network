import React from "react";
import Profile from "./Profile.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    setUserProfile,
    setStatus,
    updateStatus,
    savePhoto,
} from "../../redux/profile-reducer";
import { compose } from "redux";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
            />
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
});

export default compose(
    connect(mapStateToProps, {
        setUserProfile,
        setStatus,
        updateStatus,
        savePhoto,
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);

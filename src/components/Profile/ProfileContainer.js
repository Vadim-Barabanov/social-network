import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Importing HOCs
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
// Importing ACs
import {
    actions,
    setUserProfile,
    setStatus,
    updateStatus,
    updateProfile,
    savePhoto,
} from "../../redux/profile-reducer";
// Importing components
import Profile from "./Profile";
import Preloader from "../common/preloader/Preloader";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
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
            <div>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Profile
                        {...this.props}
                        isOwner={!this.props.match.params.userId}
                    />
                )}
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
});

export default compose(
    connect(mapStateToProps, {
        setUserProfile,
        setStatus,
        updateStatus,
        updateProfile,
        savePhoto,
        addPost: actions.addPost,
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

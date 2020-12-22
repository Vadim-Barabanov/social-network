import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    setUserProfile,
    setStatus,
    updateStatus,
    savePhoto,
    updateProfile,
    addPost,
} from "../../redux/profile-reducer";

import { withAuthRedirect } from "../../hoc/withAuthRedirect";

// Importing components
import Profile from "./Profile.jsx";
import Preloader from "../common/preloader/Preloader";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            // if (!userId) {
            //     this.props.history.push("/login");
            // }
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
        let jsx;
        if (this.props.isFetching) {
            jsx = <Preloader />;
        } else {
            jsx = (
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                />
            );
        }
        return jsx;
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
        savePhoto,
        updateProfile,
        addPost,
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

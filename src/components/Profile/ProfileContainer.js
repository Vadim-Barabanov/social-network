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

/****************************
        TEMP CHANGES
 ***************************/
const mapDispatchToProp = (dispatch) => {
    return {
        setUserProfile: (userId) => dispatch(setUserProfile(userId)),
        setStatus: (userId) => dispatch(setStatus(userId)),
        updateStatus: (status) => dispatch(updateStatus(status)),
        savePhoto: (file) => dispatch(savePhoto(file)),
        updateProfile: (profile) => dispatch(updateProfile(profile)),
        addPost: (postText) => dispatch(actions.addPost(postText)),
    };
};
/****************************
        TEMP CHANGES
 ***************************/

export default compose(
    connect(mapStateToProps, mapDispatchToProp),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

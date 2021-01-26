import React, { FC, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
// Importing ACs
import { setUserProfile, setStatus } from "../../redux/profile-reducer";
// Importing components
import Profile from "./Profile";
import Preloader from "../common/preloader/Preloader";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type PropsType = {
    match: any;
};

const ProfileContainer: FC<PropsType> = memo((props) => {
    const authorizedUserId = useSelector(
        (state: AppStateType) => state.auth.userId
    );

    const dispatch = useDispatch();

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = authorizedUserId;
        }
        dispatch(setUserProfile(userId));
        dispatch(setStatus(userId));
    }, [props.match.params.userId]);

    const isFetching = useSelector(
        (state: AppStateType) => state.profilePage.isFetching
    );

    return (
        <div>
            {isFetching ? (
                <Preloader />
            ) : (
                <Profile isOwner={!props.match.params.userId} />
            )}
        </div>
    );
});

export default compose(withAuthRedirect, withRouter)(ProfileContainer);

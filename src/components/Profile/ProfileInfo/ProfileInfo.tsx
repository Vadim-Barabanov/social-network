import React, { useState, FC } from "react";
import styles from "./ProfileInfo.module.css";
import userMale from "../../../assets/images/userMale.png";
// import { ProfileType } from "../../../types/types";

// Importing components
import Preloader from "../../common/preloader/Preloader";
import ProfileData from "./ProfileData/ProfileData";
import { ProfileDataForm } from "./ProfileData/ProfileDataForm";
import { useSelector, useDispatch } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import {
    updateStatus,
    updateProfile,
    savePhoto,
} from "../../../redux/profile-reducer";
import { ProfileType } from "../../../types/types";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

type PropsType = {
    isOwner: boolean;
};

const ProfileInfo: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const status = useSelector(
        (state: AppStateType) => state.profilePage.status
    );
    const profile = useSelector(
        (state: AppStateType) => state.profilePage.profile
    );

    const updateStatusF = (status: string) => {
        dispatch(updateStatus(status));
    };
    const updateProfileF = (profile: ProfileType) => {
        dispatch(updateProfile(profile));
    };

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    };

    return !profile ? (
        <Preloader />
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.imageBox}>
                <img
                    alt="Alt text"
                    className={styles.userImage}
                    src={
                        profile.photos!.large ||
                        profile.photos!.small ||
                        userMale
                    }
                />
                {props.isOwner ? (
                    <input
                        className={styles.inputFile}
                        type={"file"}
                        onChange={onMainPhotoSelected}
                    />
                ) : null}
            </div>
            <div className={styles.profileData}>
                {editMode ? (
                    <ProfileDataForm
                        profile={profile}
                        updateProfile={updateProfileF}
                        setEditMode={setEditMode}
                    />
                ) : (
                    <ProfileData
                        profile={profile}
                        isOwner={props.isOwner}
                        updateStatus={updateStatusF}
                        status={status}
                    />
                )}
                {props.isOwner && !editMode ? (
                    <Button
                        size="small"
                        endIcon={<EditIcon />}
                        onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default ProfileInfo;

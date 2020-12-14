import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import userMale from "../../../assets/images/userMale.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />;
    }

    return (
        <div className={styles.wrapper}>
            <img
                alt=""
                className={styles.userImage}
                src={profile.photos.large || profile.photos.small || userMale}
            />
            <div className={styles.userTitle}>
                <h2 className={styles.userName}>{profile.fullName}</h2>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
            <div className={styles.userDescription}>
                {profile.aboutMe ? (
                    <>
                        <p className={styles.headers}>About me:</p>
                        <p>{profile.aboutMe}</p>
                    </>
                ) : null}
                <p className={styles.headers}>Job status:</p>
                {profile.lookingForAJob
                    ? "I'm looking for a job."
                    : "I'm not looking for a job."}
                <br />
                {profile.lookingForAJobDescription ? (
                    <>
                        <p className={styles.headers}>Description:</p>
                        <p>{profile.lookingForAJobDescription}</p>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default ProfileInfo;

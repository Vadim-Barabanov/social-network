import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import userMale from "../../../assets/images/userMale.png";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div className={styles.wrapper}>
            <img
                alt=""
                className={styles.userImage}
                src={
                    props.profile.photos.large ||
                    props.profile.photos.small ||
                    userMale
                }
            />
            <div className={styles.userTitle}>
                <h2 className={styles.userName}>{props.profile.fullName}</h2>
                {/*                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                /> */}
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
            <div className={styles.userDescription}>
                {props.profile.aboutMe ? (
                    <>
                        <p className={styles.headers}>About me:</p>
                        <p>{props.profile.aboutMe}</p>
                    </>
                ) : null}
                <p className={styles.headers}>Job status:</p>
                {props.profile.lookingForAJob
                    ? "I'm looking for a job."
                    : "I'm not looking for a job."}
                <br />
                {props.profile.lookingForAJobDescription ? (
                    <>
                        <p className={styles.headers}>Description:</p>
                        <p>{props.profile.lookingForAJobDescription}</p>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default ProfileInfo;

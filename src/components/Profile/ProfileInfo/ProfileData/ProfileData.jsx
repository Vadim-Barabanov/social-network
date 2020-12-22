import React from "react";
import ProfileStatus from "./ProfileStatus";
import styles from "./ProfileData.module.css";

const Contact = (props) => {
    return (
        <p>
            <a href={props.contactValue} title={props.contactValue}>
                {props.contactTitle}
            </a>
        </p>
    );
};

const ProfileData = (props) => {
    return (
        <div className={styles.userDescription}>
            <div className={styles.userTitle}>
                <h2 className={styles.userName}>{props.profile.fullName}</h2>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                />
            </div>
            <div className={styles.userInfo}>
                <div>
                    <b>About me:</b>
                    <p>{props.profile.aboutMe || "No data"}</p>
                </div>
                <div>
                    <b>Looking for a job: </b>
                    <p>{props.profile.lookingForAJob ? "Yes" : "No"}</p>
                </div>
                <div>
                    <b>My skills: </b>
                    <p>
                        {props.profile.lookingForAJobDescription || "No data"}
                    </p>
                </div>
                <p>
                    <b>Contacts:</b>
                    {props.profile.contacts &&
                        Object.keys(props.profile.contacts).map((key) => {
                            if (props.profile.contacts[key]) {
                                return (
                                    <div>
                                        <Contact
                                            contactTitle={key}
                                            contactValue={
                                                props.profile.contacts[key]
                                            }
                                        />
                                    </div>
                                );
                            }
                        })}
                </p>
            </div>
        </div>
    );
};

export default ProfileData;

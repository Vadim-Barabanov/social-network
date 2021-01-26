import React, { FC } from "react";
import ProfileStatus from "./ProfileStatus";
import s from "./ProfileData.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

type ContactPropsType = {
    contactTitle: string;
    contactValue: string;
};

const Contact: FC<ContactPropsType> = (props) => {
    return (
        <p className={s.contactLink}>
            <a href={props.contactValue} title={props.contactValue}>
                {props.contactTitle}{" "}
                <i className="fas fa-external-link-alt"></i>
            </a>
        </p>
    );
};

type ProfileDataType = {
    profile: any;
    status: string;
    updateStatus: (status: string) => void;
    isOwner: boolean;
};

const ProfileData: FC<ProfileDataType> = (props) => {
    const contactsArr = Object.keys(props.profile.contacts).map((key) => {
        if (props.profile.contacts[key]) {
            return (
                <div key={key}>
                    <Contact
                        contactTitle={key}
                        contactValue={props.profile.contacts[key]}
                    />
                </div>
            );
        } else return null;
    });

    return (
        <div className={s.userDescription}>
            <div className={s.userTitle}>
                <h2 className={s.userName}>{props.profile.fullName}</h2>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                />
            </div>
            <div className={s.userInfo}>
                <p className={s.userInfoItem}>
                    <b>About me: </b>
                    {props.profile.aboutMe || "No data"}
                </p>

                <p
                    style={{ display: "flex", alignItems: "center" }}
                    className={s.userInfoItem}>
                    <b style={{ marginRight: "10px" }}>Looking for a job: </b>
                    {props.profile.lookingForAJob ? (
                        <CheckCircleIcon />
                    ) : (
                        <CancelIcon />
                    )}
                </p>

                <p className={s.userInfoItem}>
                    <b>My skills: </b>
                    {props.profile.lookingForAJobDescription || "No data"}
                </p>
                <p className={s.contactBox}>
                    <b>Contacts:</b>
                    {props.profile.contacts && contactsArr}
                </p>
            </div>
        </div>
    );
};

export default ProfileData;

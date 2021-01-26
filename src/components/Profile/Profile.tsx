import React, { FC } from "react";
import ProfileStyle from "./Profile.module.css";
import { ProfileContent } from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
    isOwner: boolean;
};

const x = 10;

const filefunc = (z: number) => {
    return x + 2 + z;
};

const y = filefunc(20);

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <ProfileContent />
        </div>
    );
};
export default Profile;

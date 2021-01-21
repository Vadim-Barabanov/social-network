import React, { FC } from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
    isOwner: boolean;
};

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPosts />
        </div>
    );
};
export default Profile;

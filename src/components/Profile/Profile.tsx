import React, { FC } from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { actions } from "../../redux/profile-reducer";

type PropsType = {
    isOwner: boolean;
};

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPosts addPost={actions.addPost} />
        </div>
    );
};
export default Profile;

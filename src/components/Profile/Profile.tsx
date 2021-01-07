import React, { FC } from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType, PostType } from "../../types/types";

type PropsType = {
    profile: ProfileType;
    addPost: (postText: string) => void;
    posts: PostType;
    isAuth: boolean;
    isFetching: boolean;
    status: string;
    authorizedUserId: number;
    newPostText: string;
};

const Profile: FC<PropsType> = (props) => {
    const myPostsProps = {
        profile: props.profile,
        addPost: props.addPost,
        posts: props.posts,
    };

    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo {...props} />
            <MyPosts {...myPostsProps} />
        </div>
    );
};
export default Profile;

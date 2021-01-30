import React, { FC } from 'react';
import ProfileStyle from './Profile.module.css';
import { ProfileContent } from './ProfileContent/ProfileContent';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    isOwner: boolean;
};

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <ProfileContent />
        </div>
    );
};
export default Profile;

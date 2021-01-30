import { Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
// Icons importing
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { FC } from 'react';
import s from './ProfileData.module.css';
import ProfileStatus from './ProfileStatus';

type ContactPropsType = {
    contactTitle: string;
    contactValue: string;
};

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    const iconSize = 'large';
    let icon: any;
    switch (contactTitle) {
        case 'github': {
            icon = <GitHubIcon fontSize={iconSize} />;
            break;
        }
        case 'facebook': {
            icon = <FacebookIcon fontSize={iconSize} />;
            break;
        }
        case 'instagram': {
            icon = <InstagramIcon fontSize={iconSize} />;
            break;
        }
        case 'twitter': {
            icon = <TwitterIcon fontSize={iconSize} />;
            break;
        }
        case 'youtube': {
            icon = <YouTubeIcon fontSize={iconSize} />;
            break;
        }
        case 'vk': {
            icon = 'VK';
            break;
        }
        case 'mainLink': {
            icon = <LinkIcon fontSize={iconSize} />;
            break;
        }
        case 'website': {
            icon = <LanguageIcon fontSize={iconSize} />;
            break;
        }
        default: {
            icon = 'External link';
        }
    }
    return (
        <p className={s.contactLink}>
            <a
                href={contactValue}
                title={contactValue}
                style={
                    icon === 'VK'
                        ? { fontSize: '30px', color: '#f50057' }
                        : { color: '#f50057' }
                }>
                {icon}
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
                <Typography variant="h4">{props.profile.fullName}</Typography>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                />
            </div>
            <div className={s.userInfo}>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                    <b style={{ marginRight: '10px' }}>Looking for a job: </b>
                    {props.profile.lookingForAJob ? (
                        <CheckCircleIcon />
                    ) : (
                        <CancelIcon />
                    )}
                </p>

                <b className={s.userDataTopic}>About me: </b>
                <p className={s.userInfoItem}>
                    {props.profile.aboutMe || 'No data'}
                </p>

                <b className={s.userDataTopic}>My skills: </b>
                <p className={s.userInfoItem}>
                    {props.profile.lookingForAJobDescription || 'No data'}
                </p>

                <b className={s.userDataTopic}>Contacts:</b>
                <p className={s.contactBox}>
                    {props.profile.contacts && contactsArr}
                </p>
            </div>
        </div>
    );
};

export default ProfileData;

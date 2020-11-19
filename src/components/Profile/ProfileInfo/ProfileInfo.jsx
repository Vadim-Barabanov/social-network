import React from "react";
import ProfileInfoStyle from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div className={ProfileInfoStyle.wrapper}>
            <img className={ProfileInfoStyle.userImage} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fvignette2.wikia.nocookie.net%2Fadventuretime%2Fimages%2F8%2F81%2FBMO.png%2Frevision%2Flatest%3Fcb%3D20130117180234%26path-prefix%3Dde&f=1&nofb=1"/>
            <h2 className={ProfileInfoStyle.userName}>Avraam Linkoln</h2>
            <p className={ProfileInfoStyle.userDescription}>Hi there! I'm Linkoln, and I'm 20 years old. My hobbies: football, baseball, basketball and tenis; I very love comping and mountain so if you want to go through Karpaty, I'll go with you!</p>
        </div>
    )
};

export default ProfileInfo;

import React from "react";
import { NavLink } from "react-router-dom";
import userMalePhoto from "../../assets/images/userMale.png";
import UsersStyle from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";

const User = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={UsersStyle.item}>
            <NavLink to={"/profile/" + user.id}>
                <img
                    alt=""
                    className={UsersStyle.userPhoto}
                    src={
                        user.photos.small
                            ? user.photos.small
                            : user.photos.large
                            ? user.photos.large
                            : userMalePhoto
                    }
                />
            </NavLink>

            <div>
                <div className={UsersStyle.userName}>{user.name}</div>
                <div className={UsersStyle.status}>{user.status}</div>
                {user.followed ? (
                    <button
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            unfollow(user.id);
                        }}
                        className={UsersStyle.btn}
                    >
                        Unfollow
                    </button>
                ) : (
                    <button
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            follow(user.id);
                        }}
                        className={UsersStyle.btn}
                    >
                        Follow
                    </button>
                )}
            </div>
        </div>
    );
};
export default User;

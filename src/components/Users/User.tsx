import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userMalePhoto from "../../assets/images/userMale.png";
import style from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";
import { UserType } from "../../types/types";

type PropsType = {
    user: UserType;
    followingInProgress: Array<number>;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
};

const User: FC<PropsType> = ({
    user,
    followingInProgress,
    follow,
    unfollow,
}) => {
    return (
        <div className={style.item}>
            <NavLink to={"/profile/" + user.id}>
                <img
                    alt=""
                    className={style.userPhoto}
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
                <div className={style.userName}>{user.name}</div>
                <div className={style.status}>
                    {user.status && user.status.length > 50
                        ? "Check status inside profile!"
                        : user.status}
                </div>
                {user.followed ? (
                    <button
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            unfollow(user.id);
                        }}
                        className={`${style.btn} ${style.btnFollowed}`}>
                        <span className={style.btnTextFollowed}>Followed</span>
                        {/* <i className="fas fa-times"></i> */}
                        <i className="fas fa-check"></i>
                    </button>
                ) : (
                    <button
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            follow(user.id);
                        }}
                        className={`${style.btn} ${style.btnFollow}`}>
                        <span className={style.btnTextFollow}>Follow</span>
                        {/* <i className="fas fa-check"></i> */}
                    </button>
                )}
            </div>
        </div>
    );
};
export default User;

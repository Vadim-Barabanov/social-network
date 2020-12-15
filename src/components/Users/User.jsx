import React from "react";
import { NavLink } from "react-router-dom";
import userMalePhoto from "../../assets/images/userMale.png";
import style from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";

const User = ({ user, followingInProgress, follow, unfollow }) => {
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
                        className={style.btn}
                    >
                        <span className={style.button__text}>Unfollow</span>
                        <i class="fas fa-times"></i>
                    </button>
                ) : (
                    <button
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            follow(user.id);
                        }}
                        className={style.btn}
                    >
                        <span className={style.button__text}>Follow</span>
                        <i class="fas fa-check"></i>
                    </button>
                )}
            </div>
        </div>
    );
};
export default User;

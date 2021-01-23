import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userMalePhoto from "../../assets/images/userMale.png";
import style from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";
import { UserType } from "../../types/types";
import loader from "../../assets/images/svg-loaders/three-dots.svg";
import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

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
            <NavLink to={"/profile/" + user.id} className={style.userNavLink}>
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
                <div>
                    <span className={style.userName}>{user.name} </span>
                    <span style={{ fontSize: "14px" }}>#{user.id}</span>
                </div>
                <div className={style.status}>
                    {user.status && user.status.length > 50
                        ? "Check status inside profile!"
                        : user.status}
                </div>
                {user.followed ? (
                    <Button
                        style={{ marginTop: "10px" }}
                        size="small"
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            unfollow(user.id);
                        }}>
                        {/* className={`${style.btn} ${style.btnFollowed}`} */}
                        {/* <i className="fas fa-times"></i> */}
                        {followingInProgress.some(
                            (item) => item === user.id
                        ) ? (
                            <img
                                src={loader}
                                alt="loading..."
                                style={{ width: "50px" }}
                            />
                        ) : (
                            <PersonAddDisabledIcon />
                        )}
                    </Button>
                ) : (
                    <Button
                        style={{ marginTop: "10px" }}
                        variant="contained"
                        size="small"
                        disabled={followingInProgress.some(
                            (item) => item === user.id
                        )}
                        onClick={() => {
                            follow(user.id);
                        }}>
                        {followingInProgress.some(
                            (item) => item === user.id
                        ) ? (
                            <img
                                src={loader}
                                alt="loading..."
                                style={{ width: "50px" }}
                            />
                        ) : (
                            <PersonAddIcon />
                        )}
                        {/* <i className="fas fa-check"></i> */}
                    </Button>
                )}
            </div>
        </div>
    );
};
export default User;

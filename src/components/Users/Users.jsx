import React from "react";
import { NavLink } from "react-router-dom";
import userMalePhoto from "../../assets/images/userMale.png";
import UsersStyle from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={UsersStyle.wrapper}>
            {/************
              PAGES MAPING
              ************/}
            <div className={UsersStyle.pages__box}>
                {pages.map((item) => {
                    return (
                        <span
                            key={item}
                            onClick={() => {
                                if (props.currentPage === item) return null;
                                props.onPageChange(item);
                            }}
                            className={
                                props.currentPage === item
                                    ? UsersStyle.selectedPage
                                    : null
                            }
                        >
                            {item}
                        </span>
                    );
                })}
            </div>

            {/************
              USERS MAPING
              ************/}
            {props.users.map((user) => {
                return (
                    <div className={UsersStyle.item} key={user.id}>
                        <NavLink to={"/profile/" + user.id}>
                            <img
                                alt=""
                                className={UsersStyle.userPhoto}
                                src={
                                    user.photos.small != null
                                        ? user.photos.small
                                        : user.photos.large != null
                                        ? user.photos.large
                                        : userMalePhoto
                                }
                            />
                        </NavLink>

                        <div>
                            <div className={UsersStyle.userName}>
                                {user.name}
                            </div>
                            <div className={UsersStyle.status}>
                                {user.status}
                            </div>
                            {user.followed ? (
                                <button
                                    disabled={props.followingInProgress.some(
                                        (item) => item === user.id
                                    )}
                                    onClick={() => {
                                        props.unfollow(user.id);
                                    }}
                                    className={UsersStyle.btn}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    disabled={props.followingInProgress.some(
                                        (item) => item === user.id
                                    )}
                                    onClick={() => {
                                        props.follow(user.id);
                                    }}
                                    className={UsersStyle.btn}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Users;

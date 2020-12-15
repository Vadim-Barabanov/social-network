import React from "react";
import style from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";
// Importing components
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
    return (
        <div className={style.wrapper}>
            <Paginator
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />

            <div className={style.users__list}>
                {props.users.map((user) => (
                    <User
                        user={user}
                        key={user.id}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        followingInProgress={props.followingInProgress}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;

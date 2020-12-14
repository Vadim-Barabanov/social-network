import React from "react";
import UsersStyle from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";
// Importing components
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
    return (
        <div className={UsersStyle.wrapper}>
            <Paginator
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />
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
    );
};

export default Users;

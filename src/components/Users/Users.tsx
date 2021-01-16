import React, { FC } from "react";
import style from "./UsersStyle.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";
// Importing components
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    onFilterChange: (filter: FilterType) => void;
    users: Array<UserType>;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    followingInProgress: Array<number>;
};

const Users: FC<PropsType> = (props) => {
    return (
        <div className={style.wrapper}>
            <UsersSearchForm onFilterChange={props.onFilterChange} />
            <div className={style.usersList}>
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
            <Paginator
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />
        </div>
    );
};

export default Users;

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// SELECTORS
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersArray,
    getUsersFilter,
} from "../../redux/selectors/users-selectores";
// AC's
import { follow, getUsers, unfollow } from "../../redux/users-reducer";
// TYPES
import { FilterType } from "../../redux/users-reducer";
import { UserType } from "../../types/types";
// COMPONENTS
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import style from "./UsersStyle.module.css";

type PropsType = {};

export const Users: FC<PropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsersArray);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
        });
    }, [filter, currentPage]);

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

    const onPageChange = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    };
    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    };
    const followUser = (userId: number) => {
        dispatch(follow(userId));
    };
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    };

    return (
        <div className={style.wrapper}>
            <UsersSearchForm onFilterChange={onFilterChange} />
            <div className={style.usersList}>
                {users.map((user: UserType) => (
                    <User
                        user={user}
                        key={user.id}
                        follow={followUser}
                        unfollow={unfollowUser}
                        followingInProgress={followingInProgress}
                    />
                ))}
            </div>
            <Paginator
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
        </div>
    );
};

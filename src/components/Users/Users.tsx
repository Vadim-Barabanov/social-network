import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
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
import Pagination from "@material-ui/lab/Pagination";

type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string };

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
        const parsed = queryString.parse(
            history.location.search.substr(1)
        ) as QueryParamsType;
        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!parsed.page) actualPage = +parsed.page;

        if (!!parsed.term)
            actualFilter = { ...actualFilter, term: parsed.term as string };
        if (!!parsed.friend)
            actualFilter = {
                ...actualFilter,
                friend:
                    parsed.friend === "null"
                        ? null
                        : parsed.friend === "true"
                        ? true
                        : false,
            };
        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {};

        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: "/users",
            search: queryString.stringify(query),
        });
    }, [filter, currentPage]);

    const handlePageChange = (event: any, page: number) => {
        dispatch(getUsers(page, pageSize, filter));
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
            {/* <Paginator */}
            {/*     currentPage={currentPage} */}
            {/*     onPageChange={onPageChange} */}
            {/*     totalItemsCount={totalUsersCount} */}
            {/*     pageSize={pageSize} */}
            {/* /> */}
            <Pagination
                style={{ marginTop: "20px" }}
                onChange={handlePageChange}
                count={Math.ceil(totalUsersCount / pageSize)}
                page={currentPage}
            />
        </div>
    );
};

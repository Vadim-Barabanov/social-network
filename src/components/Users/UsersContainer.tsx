import React from "react";
import { connect } from "react-redux";
import Preloader from "../common/preloader/Preloader";
import Users from "./Users";
import {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
} from "./../../redux/users-reducer";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

// SELECTORS
import {
    getUsersArray,
    getPageSize,
    getCurrentPage,
    getTotalUsersCount,
    getIsFetching,
    getFollowingInProgress,
} from "../../redux/selectors/users-selectores";

type PropsType = {
    currentPage: number;
    pageSize: number;
    totalUsersCount: number;
    isFetching: boolean;
    users: Array<UserType>;
    followingInProgress: Array<number>;

    getUsers: (currentPage: number, pageSize: number) => void;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
};

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChange = (pageNumber: number) => {
        let { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChange={this.onPageChange}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />
            </>
        );
    }
}

type OwnPropsType = {};

type MapDispatchPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setCurrentPage: (pageNumber: number) => void;
    getUsers: (currentPage: number, pageSize: number) => void;
};

type MapStatePropsType = {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersArray(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default connect<
    MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    AppStateType
>(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
})(UsersContainer);

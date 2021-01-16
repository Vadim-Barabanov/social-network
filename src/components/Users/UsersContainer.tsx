import React from "react";
import { connect } from "react-redux";
import Preloader from "../common/preloader/Preloader";
import Users from "./Users";
import {
    follow,
    unfollow,
    getUsers,
    FilterType,
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

type OwnPropsType = {};

type MapDispatchPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    getUsers: (currentPage: number, pageSize: number, term: string) => void;
};

type MapStatePropsType = {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize, "");
    }

    onPageChange = (pageNumber: number) => {
        let { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize, "");
    };

    onFilterChange = (filter: FilterType) => {
        let { pageSize, currentPage } = this.props;
        this.props.getUsers(currentPage, pageSize, filter.term);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    onPageChange={this.onPageChange}
                    onFilterChange={this.onFilterChange}
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
    getUsers,
})(UsersContainer);

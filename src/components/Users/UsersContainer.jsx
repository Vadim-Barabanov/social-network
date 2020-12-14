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

// SELECTORS
import {
    getUsersArray,
    getPageSize,
    getCurrentPage,
    getTotalUsersCount,
    getIsFetching,
    getFollowingInProgress,
} from "../../redux/selectors/users-selectores";

class UsersContainer extends React.Component {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChange = (pageNumber) => {
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

let mapStateToProps = (state) => {
    return {
        users: getUsersArray(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
})(UsersContainer);

import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow
} from '../../redux/users_reducer';
import Users from './Users';
import Preloader from '../common/preloader';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users_selectors";
import {UsersType} from "../../types/type";
import {AppStateType} from "../../redux/redux_store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void

}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
        />
        </>
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}



export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            follow,
            unfollow,
            setCurrentPage,
            toggleIsFollowingProgress,
            getUsers: requestUsers
        }),
    withAuthRedirect)
    // @ts-ignore
(UsersContainer);
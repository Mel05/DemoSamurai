import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/type";
import {AppStateType} from "./redux_store";
import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users ids
};

type initialState = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): initialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray
                (state.users, action.userId,"id", { followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray
                (state.users, action.userId,"id", { followed: false})
            }

        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType
| SetTotalUsersCountType | ToggleIsFetchingType | ToggIsFollowingProgressType



type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId});
type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId});
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, users});
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = ( isFetching: boolean, userId: number): ToggIsFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
                                   apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        let response = await apiMethod(userId);

        if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleIsFollowingProgress(false, userId));

}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

export default usersReducer;
import React from "react";
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/type";


type PropsType ={
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
                  currentPage,
                  totalUsersCount,
                  pageSize,
                  onPageChanged,
                  users,
                  followingInProgress,
                  unfollow,
                  follow,
                  ...props
              }) => {

    return (
        <div className={s.wrapper}>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollow}
                                     follow={follow}
                    />
                )
            }
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        </div>
    )
}


export default Users;
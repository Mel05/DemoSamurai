import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <div className={s.header}>
                <ProfileInfo
                    savePhoto={props.savePhoto}
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
            <div className={s.my__posts}>
                <MyPostsContainer />   
            </div>

        </div>
    );
}

export default Profile;
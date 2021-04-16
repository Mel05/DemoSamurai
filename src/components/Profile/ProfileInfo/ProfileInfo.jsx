import React, {useState} from 'react';
import fon from './1.jpg'
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/img/userPhoto.jpg"
import ProfileDataForma from "./ProfileDataForm"



const ProfileInfo = ( {profile, status, updateStatus, isOwner, savePhoto}) => {
    
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected =(e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
            <div>

                <div className={s.img}>
                    <img src={fon}/>
                </div>

                <div>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                    { isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }
                    
                    {editMode ? <ProfileDataForma profile={profile} /> 
                    : <ProfileData goToEditMode={() => {setEditMode(true)}}
                     profile={profile} isOwner={isOwner}/>}    

                    <div> 
                       <ProfileStatusWithHooks status={status}
                                      updateStatus={updateStatus}
                       />
                    </div>
                    <div> <b>Id</b>:{profile.userId} </div>

                </div>

            </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return(
         <div>
                <div>
                    { isOwner && <button onClick={goToEditMode}> edit </button>}
                </div>
                <div>
                    <b>Full name</b>: {profile.fullName}
                </div>
                <div> 
                    <b>Looking for a Job</b>:{profile.lookingForAJob ? "yes" : "no"} 
                </div>
                    {profile.lookingForAJob &&
                <div> 
                    <b>My professional skills</b>:{profile.lookingForAJobDescription} 
                </div>}
                <div>
                    <b>About me</b>:{profile.aboutMe} 
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts)
                    .map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                </div> 
        </div>
    )
}

<ProfileDataForma />

const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
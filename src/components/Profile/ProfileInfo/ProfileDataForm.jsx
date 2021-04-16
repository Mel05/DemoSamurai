import React from "react";
import {createField, Input, Textarea} from "../../common/inputsForms"

const ProfileDataForma = ({profile}) => {
    return(
        <div>
            <div>
                 <button onClick={() => {}}> save </button>
            </div>
            <div>
                <b>Full name</b>: {/*{createField("Full name", "fullName", [], Input)} */}
            </div>
            <div> 
                <b>Looking for a Job</b>: {/*{createField("", "lookingForAJob", [], Input, {type: "checkbox"})} */} 
            </div>
                
            <div> 
                <b>My professional skills</b>: 
                {/*{createField("My professional skills", "lookingForAJobDescription", [], Textarea)} */}
            </div>
            <div>
                <b>About me</b>:{profile.aboutMe} 
            </div>
           {/* <div>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div> */}
        </div>
    )
}

export default ProfileDataForma
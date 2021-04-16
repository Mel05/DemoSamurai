import {profileAPI, usersAPI} from "../api/api";
import {PostsType, ContactsType, PhotosType, ProfileType} from "../types/type";


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'it is my first post', likesCount: 20}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''

};


const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newTextPost
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case ADD_POST:
            let text = state.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 7, message: text}]
            };
        case SET_PROFILE:
            return {...state, profile: action.profile}

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
    
        default:
            return state;    
    }
}
type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})
type SetProfileType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}
export const setProfile = (profile: ProfileType): SetProfileType => ({type: SET_PROFILE, profile})
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId})
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})



export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newTextPost: text})


export const getProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export default profileReducer;
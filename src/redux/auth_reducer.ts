import {authAPI, ResultCodeEnum} from "../api/api";

const SET_USER_DATA = 'DemoSamurai/auth/SET_USER_DATA';

export type InitialStateType = {
    usersId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean
};

let initialState: InitialStateType = {
    usersId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true
};



const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType ={
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
         payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean)
    : SetAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload:{userId, email, login, isAuth}});

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me();

        if (meData.resultCode === ResultCodeEnum.Success) {
            let {id, email, login} = meData.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
}

export const login = (email: string, password: string, remember: boolean) => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, remember);

            if (loginData.resultCode === ResultCodeEnum.Success) {
                dispatch(getAuthUserData());
            }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserData(null, null, null, false));
            } /*else {
                let message = response.data.messages.length > 0
                    ? response.data.messages[0] : "some error";
                dispatch(stopSubmit("login", {_error: message}));
            }*/
}

export default authReducer;
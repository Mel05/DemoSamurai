import axios from "axios";




const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "3ceb9d71-115b-41e2-a03a-22f7b54d9b47"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    },
}

export const profileAPI = {
       getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },

    getStatus(userId: number) {
        return instance.get('profile/status/' + userId);
    },

    updateStatus(status: string) {
        return instance.put('profile/status', {status: status});
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export enum ResultCodeEnum {
    Success = 0,
    eError = 1
}

export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}

type AuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type AuthLoginType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeEnumForCaptcha
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<AuthMeType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, remember = false) {
        return instance.post<AuthLoginType>('auth/login', { email, password, remember })
            .then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    }
}



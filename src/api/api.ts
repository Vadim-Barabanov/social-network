import axios from "axios";
import { ProfileType, ResultCodes, CaptchaResultCode } from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "f9e15d90-7a73-411f-99c9-ccec43cdec06",
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data);
    },

    follow(userId: number) {
        return instance
            .post(`follow/${userId}`, {})
            .then((response) => response.data);
    },

    unfollow(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then((response) => response.data);
    },
};

type AuthMeResponseType = {
    data: { id: number; email: string; login: string };
    resultCode: ResultCodes;
    messages: Array<string>;
};

type LoginResponseType = {
    data: { id: number };
    resultCode: ResultCodes | CaptchaResultCode;
    messages: Array<string>;
};

export const authAPI = {
    authMe() {
        return instance
            .get<AuthMeResponseType>(`auth/me`)
            .then((response) => response.data);
    },

    login(
        email: string,
        password: string,
        rememberMe: boolean = false,
        captcha: string | null = null
    ) {
        return instance
            .post<LoginResponseType>(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then((response) => response.data);
    },

    logout() {
        return instance.delete(`auth/login`).then((response) => response.data);
    },
};

export const profileAPI = {
    getProfileData(userId: number) {
        return instance
            .get(`profile/${userId}`)
            .then((response) => response.data);
    },

    getStatus(userId: number) {
        return instance
            .get(`profile/status/${userId}`)
            .then((response) => response.data);
    },

    updateStatus(status: string) {
        return instance
            .put(`profile/status`, { status })
            .then((response) => response.data);
    },

    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance
            .put(`profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => response.data);
    },

    updateProfile(profile: ProfileType) {
        return instance
            .put(`profile`, profile)
            .then((response) => response.data);
    },
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get(`security/get-captcha-url`)
            .then((response) => response.data);
    },
};

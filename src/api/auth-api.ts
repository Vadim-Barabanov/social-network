import { instance } from "./api";
import { ResultCodes, CaptchaResultCode } from "../types/types";
import { APIResponseType } from "./api";

type AuthMeDataType = {
    id: number;
    email: string;
    login: string;
};

type LoginDataType = {
    id: number;
};

export const authAPI = {
    // authMe() {
    //     return instance
    //         .get<ResponseType<AuthMeDataType>>(`auth/me`)
    //         .then((res) => res.data);
    // },

    async authMe() {
        let res = await instance.get<APIResponseType<AuthMeDataType>>(
            `auth/me`
        );
        return res.data;
    },

    //     login(
    //         email: string,
    //         password: string,
    //         rememberMe: boolean = false,
    //         captcha: string | null = null
    //     ) {
    //         return instance
    //             .post<ResponseType<LoginDataType, ResultCodes | CaptchaResultCode>>(
    //                 `auth/login`,
    //                 {
    //                     email,
    //                     password,
    //                     rememberMe,
    //                     captcha,
    //                 }
    //             )
    //             .then((res) => res.data);
    //     },

    async login(
        email: string,
        password: string,
        rememberMe: boolean = false,
        captcha: string | null = null
    ) {
        let res = await instance.post<
            APIResponseType<LoginDataType, ResultCodes | CaptchaResultCode>
        >(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        });
        return res.data;
    },

    // logout() {
    //     return instance.delete(`auth/login`).then((res) => res.data);
    // },

    async logout() {
        let res = await instance.delete(`auth/login`);
        return res.data;
    },
};

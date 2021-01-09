import { instance } from "./api";
import { ResultCodes, CaptchaResultCode } from "../types/types";
import { ResponseType } from "./api";

type AuthMeDataType = {
    id: number;
    email: string;
    login: string;
};

type LoginDataType = {
    id: number;
};

export const authAPI = {
    authMe() {
        return instance
            .get<ResponseType<AuthMeDataType>>(`auth/me`)
            .then((response) => response.data);
    },

    login(
        email: string,
        password: string,
        rememberMe: boolean = false,
        captcha: string | null = null
    ) {
        return instance
            .post<ResponseType<LoginDataType, ResultCodes | CaptchaResultCode>>(
                `auth/login`,
                {
                    email,
                    password,
                    rememberMe,
                    captcha,
                }
            )
            .then((response) => response.data);
    },

    logout() {
        return instance.delete(`auth/login`).then((response) => response.data);
    },
};

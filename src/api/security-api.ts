import { instance } from "./api";

type GetCaptcahUrlType = {
    url: string;
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get<GetCaptcahUrlType>(`security/get-captcha-url`)
            .then((response) => response.data);
    },
};

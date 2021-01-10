import { instance } from "./api";
import { ProfileType } from "../types/types";
import { ResponseType } from "./api";

export const profileAPI = {
    getProfileData(userId: number) {
        return instance.get(`profile/${userId}`).then((res) => res.data);
    },

    getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then((res) => res.data);
    },

    updateStatus(status: string) {
        return instance
            .put(`profile/status`, { status })
            .then((res) => res.data) as Promise<ResponseType>;
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
            .then((res) => res.data);
    },

    updateProfile(profile: ProfileType) {
        return instance
            .put(`profile`, profile)
            .then((res) => res.data) as Promise<ResponseType>;
    },
};

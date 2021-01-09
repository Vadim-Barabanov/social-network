import { instance } from "./api";
import { ProfileType } from "../types/types";

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

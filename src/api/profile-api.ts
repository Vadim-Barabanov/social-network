import { instance } from "./api";
import { ProfileType, PhotosType } from "../types/types";
import { APIResponseType } from "./api";

type ResponsePhotosType = {
    photos: PhotosType;
};

export const profileAPI = {
    getProfileData(userId: number | null) {
        return instance.get(`profile/${userId}`).then((res) => res.data);
    },

    updateProfile(profile: ProfileType) {
        return instance
            .put<APIResponseType>(`profile`, profile)
            .then((res) => res.data);
    },

    getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then((res) => res.data);
    },

    updateStatus(status: string) {
        return instance
            .put<APIResponseType>(`profile/status`, { status })
            .then((res) => res.data);
    },

    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);

        return instance
            .put<APIResponseType<ResponsePhotosType>>(
                `profile/photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res) => res.data);
    },
};

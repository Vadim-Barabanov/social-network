import { instance } from './api';
import { ProfileType, PhotosType } from '../types/types';
import { APIResponseType } from './api';

type ResponsePhotosType = {
    photos: PhotosType;
};

export const profileAPI = {
    async getProfileData(userId: number | null) {
        const res = await instance.get<ProfileType>(`profile/${userId}`);
        return res.data;
    },

    async updateProfile(profile: ProfileType) {
        const res = await instance.put<APIResponseType>(`profile`, profile);
        return res.data;
    },

    async getStatus(userId: number) {
        const res = await instance.get<string>(`profile/status/${userId}`);
        return res.data;
    },

    async updateStatus(status: string) {
        const res = await instance.put<APIResponseType>(`profile/status`, {
            status,
        });
        return res.data;
    },

    async savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await instance.put<APIResponseType<ResponsePhotosType>>(
            `profile/photo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res.data;
    },
};

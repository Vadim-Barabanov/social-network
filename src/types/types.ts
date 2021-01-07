// Enums
export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum CaptchaResultCode {
    CaptchaIsRequired = 10,
}

// Types
export type PostType = {
    id: number;
    text: string;
    likesCount: number;
};
export type PhotosType = {
    large: string | null;
    small: string | null;
};
export type ContactsType = {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
};
export type ProfileType = {
    userId: number;
    fullName: string;
    lookingForAJob?: boolean;
    lookingForAJobDescription?: string;
    contacts?: ContactsType;
    photos?: PhotosType;
};
export type UserType = {
    id: number;
    name: string;
    status: string;
    followed: boolean;
    photos: PhotosType;
};
export type FriendType = {
    id: number;
    name: string;
    link: string;
};
export type PromiseLogoutType = {
    resultCode: number;
    messages: Array<string>;
    data?: Object;
};

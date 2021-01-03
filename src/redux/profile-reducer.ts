import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO = "SAVE_PHOTO";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";

let initialState = {
    posts: [
        { id: 1, text: "It's my first post!", likesCount: 12 },
        { id: 2, text: "What's up guiz?", likesCount: 42 },
        {
            id: 3,
            text:
                "It's some long post to see how it looks when there are plenty of text. So it's another sentense for more text spreading! Okay, and in conslusion a little bit more...",
            likesCount: 50,
        },
    ] as Array<PostType>,
    status: "" as string,
    profile: null as ProfileType | null,
    isFetching: false as boolean,
};

export type InitialStateType = typeof initialState;

const profileReducer = (
    state = initialState,
    action: any
): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { id: 5, text: action.postText, likesCount: 0 },
                ],
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((item) => item.id !== action.postId),
            };
        }

        case SET_USERS_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }

        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                } as ProfileType,
            };
        }

        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.fetch,
            };
        }

        default:
            return state;
    }
};

// ACTION CREATERS
type AddPostType = {
    type: typeof ADD_POST;
    postText: string;
};
export const addPost = (postText: string): AddPostType => ({
    type: ADD_POST,
    postText,
});
type SetUserProfileSuccessType = {
    type: typeof SET_USERS_PROFILE;
    profile: ProfileType;
};
export const setUserProfileSuccess = (
    profile: ProfileType
): SetUserProfileSuccessType => ({
    type: SET_USERS_PROFILE,
    profile,
});
type SetStatusSuccessType = {
    type: typeof SET_STATUS;
    status: string;
};
export const setStatusSuccess = (status: string): SetStatusSuccessType => ({
    type: SET_STATUS,
    status,
});
type DeletePostType = {
    type: typeof DELETE_POST;
    postId: number;
};
export const deletePost = (postId: number): DeletePostType => ({
    type: DELETE_POST,
    postId,
});
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO;
    photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SAVE_PHOTO,
    photos,
});
type ToggleIsFetchingType = {
    type: typeof TOGGLE_FETCHING;
    fetch: boolean;
};
const toggleFetching = (fetch: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_FETCHING,
    fetch,
});

// THUNK CREATERS
export const setUserProfile = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFetching(true));
    let data = await profileAPI.getProfileData(userId);
    dispatch(setUserProfileSuccess(data));
    dispatch(toggleFetching(false));
};

export const updateProfile = (profile: ProfileType) => async (
    dispatch: any,
    getState: any
) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.updateProfile(profile);
    if (data.resultCode === 0) {
        dispatch(setUserProfile(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
};

export const setStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatusSuccess(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatusSuccess(status));
    }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;

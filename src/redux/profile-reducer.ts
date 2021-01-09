import { profileAPI } from "../api/profile-api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsType } from "./redux-store";

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
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { id: 5, text: action.postText, likesCount: 0 },
                ],
            };
        }

        case "DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter((item) => item.id !== action.postId),
            };
        }

        case "SET_USERS_PROFILE": {
            return {
                ...state,
                profile: action.profile,
            };
        }

        case "SET_STATUS": {
            return {
                ...state,
                status: action.status,
            };
        }

        case "SAVE_PHOTO": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                } as ProfileType,
            };
        }

        case "TOGGLE_FETCHING": {
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
type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    addPost: (postText: string) =>
        ({
            type: "ADD_POST",
            postText,
        } as const),
    setUserProfileSuccess: (profile: ProfileType) =>
        ({
            type: "SET_USERS_PROFILE",
            profile,
        } as const),
    setStatusSuccess: (status: string) =>
        ({
            type: "SET_STATUS",
            status,
        } as const),
    deletePost: (postId: number) =>
        ({
            type: "DELETE_POST",
            postId,
        } as const),
    savePhotoSuccess: (photos: PhotosType) =>
        ({
            type: "SAVE_PHOTO",
            photos,
        } as const),
    toggleFetching: (fetch: boolean) =>
        ({
            type: "TOGGLE_FETCHING",
            fetch,
        } as const),
};

// THUNK CREATERS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const setUserProfile = (userId: number): ThunkType => async (
    dispatch: any
) => {
    dispatch(actions.toggleFetching(true));
    let data = await profileAPI.getProfileData(userId);
    dispatch(actions.setUserProfileSuccess(data));
    dispatch(actions.toggleFetching(false));
};

export const updateProfile = (profile: ProfileType): ThunkType => async (
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

export const setStatus = (userId: number): ThunkType => async (
    dispatch: any
) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusSuccess(data));
};

export const updateStatus = (status: string): ThunkType => async (
    dispatch: any
) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatusSuccess(status));
    }
};

export const savePhoto = (file: any): ThunkType => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;

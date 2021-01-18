import { profileAPI } from "../api/profile-api";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { InferActionsType, BaseThunkType } from "./redux-store";

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
        case "PROFILE/ADD_POST": {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { id: 5, text: action.postText, likesCount: 0 },
                ],
            };
        }

        case "PROFILE/DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter((item) => item.id !== action.postId),
            };
        }

        case "PROFILE/SET_USERS_PROFILE": {
            return {
                ...state,
                profile: action.profile,
            };
        }

        case "PROFILE/SET_STATUS": {
            return {
                ...state,
                status: action.status,
            };
        }

        case "PROFILE/SAVE_PHOTO": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                } as ProfileType,
            };
        }

        case "PROFILE/TOGGLE_FETCHING": {
            return {
                ...state,
                isFetching: action.fetching,
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
            type: "PROFILE/ADD_POST",
            postText,
        } as const),
    setUserProfileSuccess: (profile: ProfileType) =>
        ({
            type: "PROFILE/SET_USERS_PROFILE",
            profile,
        } as const),
    setStatusSuccess: (status: string) =>
        ({
            type: "PROFILE/SET_STATUS",
            status,
        } as const),
    deletePost: (postId: number) =>
        ({
            type: "PROFILE/DELETE_POST",
            postId,
        } as const),
    savePhotoSuccess: (photos: PhotosType) =>
        ({
            type: "PROFILE/SAVE_PHOTO",
            photos,
        } as const),
    toggleFetching: (fetching: boolean) =>
        ({
            type: "PROFILE/TOGGLE_FETCHING",
            fetching,
        } as const),
};

// THUNK CREATERS
type ThunkType = BaseThunkType<ActionsType>;

export const setUserProfile = (userId: number): ThunkType => async (
    dispatch
) => {
    dispatch(actions.toggleFetching(true));
    let data = await profileAPI.getProfileData(userId);
    dispatch(actions.setUserProfileSuccess(data));
    dispatch(actions.toggleFetching(false));
};

export const updateProfile = (profile: ProfileType): ThunkType => async (
    dispatch,
    getState
) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.updateProfile(profile);
    if (userId !== null) {
        if (data.resultCode === 0) {
            dispatch(setUserProfile(userId));
        }
    } else throw new Error("User id can't be null");
};

export const setStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusSuccess(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatusSuccess(status));
    }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;

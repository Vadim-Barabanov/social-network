import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

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
    ],
    status: "",
    profile: null,
    isFetching: false,
};

const profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: action.photos },
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
export const addPost = (postText) => ({ type: ADD_POST, postText });
export const setUserProfileSuccess = (profile) => ({
    type: SET_USERS_PROFILE,
    profile,
});
export const setStatusSuccess = (status) => ({
    type: SET_STATUS,
    status,
});
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});
export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO,
    photos,
});
const toggleFetching = (fetch) => ({
    type: TOGGLE_FETCHING,
    fetch,
});

// THUNK CREATERS
export const setUserProfile = (userId) => async (dispatch) => {
    dispatch(toggleFetching(true));
    let data = await profileAPI.getProfileData(userId);
    dispatch(setUserProfileSuccess(data));
    dispatch(toggleFetching(false));
};
export const updateProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.updateProfile(profile);
    if (data.resultCode === 0) {
        dispatch(setUserProfile(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
};
export const setStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatusSuccess(data));
};
export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatusSuccess(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;

import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO = "SAVE_PHOTO";

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
    newPostText: "",
    status: "",
    profile: null,
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

// THUNK CREATERS
export const setUserProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfileData(userId);
    dispatch(setUserProfileSuccess(data));
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

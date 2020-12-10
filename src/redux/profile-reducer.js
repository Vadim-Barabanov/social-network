import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";

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
                    { id: 5, text: action.postText, likesCount: 1000 },
                ],
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

// THUNK CREATERS
export const setUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfileData(userId).then((data) => {
        dispatch(setUserProfileSuccess(data));
    });
};
export const setStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then((data) => {
        dispatch(setStatusSuccess(data));
    });
};
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then((data) => {
        if (data.resultCode === 0) {
            dispatch(setStatusSuccess(status));
        }
    });
};

export default profileReducer;

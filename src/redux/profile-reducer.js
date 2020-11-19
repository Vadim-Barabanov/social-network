const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    posts: [
        { id: 1, text: "It's my first post!", likesCount: 12 },
        { id: 2, text: "What's up guiz?", likesCount: 42 },
    ],
    newPostText: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                text: state.newPostText,
                likesCount: 0,
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
};

export const addPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});

export default profileReducer;

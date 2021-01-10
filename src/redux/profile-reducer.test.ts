import profileReducer, { actions } from "./profile-reducer";

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
    status: "s",
    isFetching: false,
    profile: null,
};
let addPostAction = actions.addPost("Test text");

test("length of posts should be incremented", () => {
    let newState = profileReducer(initialState, addPostAction);

    expect(newState.posts.length).toBe(4);
});

test("added text should to correct", () => {
    let newState = profileReducer(initialState, addPostAction);

    expect(newState.posts[3].text).toBe("Test text");
});

test("likesCount should be 0", () => {
    let newState = profileReducer(initialState, addPostAction);

    expect(newState.posts[3].likesCount).toBe(0);
});

test("after deleting length of array should be decremented", () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2);
});

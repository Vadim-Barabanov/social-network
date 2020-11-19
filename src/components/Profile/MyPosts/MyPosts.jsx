import React from "react";
import MyPostsStyle from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (elem) => {
        let text = elem.target.value;
        props.updateNewPostText(text);
    };

    let postsElements = props.posts.map((item) => (
        <Post text={item.text} likesCount={item.likesCount} />
    ));
    return (
        <div className={MyPostsStyle.posts}>
            {postsElements}
            <textarea
                onChange={onPostChange}
                value={props.newPostText}
                className={MyPostsStyle.text}
            />
            <button onClick={onAddPost} className={MyPostsStyle.btn}>
                Add Post
            </button>
        </div>
    );
};
export default MyPosts;

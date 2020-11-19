import React from "react";
import PostStyle from './Post.module.css';

const Post = (props) => {
    return (
        <div className={PostStyle.post}>
            <div className={PostStyle.post__message}>{props.text}</div>
            <div className={PostStyle.post__likes}>
                Likes: {props.likesCount}
                <button>Like!</button>
            </div>
        </div>
    );
};
export default Post;

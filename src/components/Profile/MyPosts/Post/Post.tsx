import React, { FC } from "react";
import PostStyle from "./Post.module.css";

type PropsType = {
    likesCount: number;
    text: string;
};

const Post: FC<PropsType> = (props) => {
    return (
        <div className={PostStyle.post}>
            <div className={PostStyle.post__message}>{props.text}</div>
            <div className={PostStyle.post__likes}>
                {props.likesCount}
                <button>Like!</button>
            </div>
        </div>
    );
};
export default Post;

import React, { FC } from "react";
import s from "./Post.module.css";
import { Button } from "@material-ui/core";

type PropsType = {
    likesCount: number;
    text: string;
};

const Post: FC<PropsType> = (props) => {
    return (
        <div className={s.post}>
            <div className={s.post__message}>{props.text}</div>
            <div className={s.post__likes}>
                {props.likesCount}
                <Button size="small">Like!</Button>
            </div>
        </div>
    );
};
export default Post;

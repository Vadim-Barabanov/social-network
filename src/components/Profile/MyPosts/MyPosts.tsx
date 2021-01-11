import React, { FC } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../utilits/validators";
import { FormCreator } from "../../FormControls/FormControls";
import { PostType } from "../../../types/types";

const Textarea = FormCreator("textarea");

// type PropsType = {
//     addPost: (postText: string) => void;
//     posts: Array<PostType>;
// };

// type FormDataType = {
//     postText: string;
// };

const PostsForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div>
                <Field
                    component={Textarea}
                    name={"postText"}
                    validate={[required]}
                    placeholder={"Post message"}
                />
            </div>
            <div>
                <button className={styles.send__btn}>Send</button>
            </div>
        </form>
    );
};

const PostsReduxForm = reduxForm({
    form: "posts",
})(PostsForm);

const MyPosts: FC<any> = React.memo((props) => {
    let onSubmit = (data: any) => {
        props.addPost(data.postText);
    };

    let postsElements = props.posts.map((item: PostType) => (
        <Post key={item.id} text={item.text} likesCount={item.likesCount} />
    ));

    return (
        <div className={styles.posts}>
            <h3 className={styles.postsHeader}>Posts:</h3>
            {postsElements}
            <PostsReduxForm onSubmit={onSubmit} />
        </div>
    );
});
export default MyPosts;

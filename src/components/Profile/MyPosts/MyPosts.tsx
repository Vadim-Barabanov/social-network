import React, { FC } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, Formik, Form } from "formik";
import { PostType } from "../../../types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

const PostsForm = (props: any) => {
    const submit = (values: any) => {
        props.addPost(values.postText);
    };
    return (
        <Formik
            initialValues={{ postText: "" }}
            onSubmit={submit}
            className={styles.form}>
            {({ isSubmitting }) => (
                <Form>
                    <Field component="textarea" name={"postText"} />
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className={styles.send__btn}>
                        Send
                    </button>
                </Form>
            )}
        </Formik>
    );
};

const MyPosts: FC<any> = React.memo((props) => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts);

    let postsElements = posts.map((item: PostType) => (
        <Post key={item.id} text={item.text} likesCount={item.likesCount} />
    ));

    return (
        <div className={styles.posts}>
            <h3 className={styles.postsHeader}>Posts:</h3>
            {postsElements}
            <PostsForm addPost={props.addPost} />
        </div>
    );
});
export default MyPosts;

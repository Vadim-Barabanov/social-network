import React, { FC } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { PostType } from "../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { actions } from "../../../redux/profile-reducer";

type PropsType = {};
type FormValues = {
    postText: string;
};

const PostsForm: FC<PropsType> = () => {
    const dispatch = useDispatch();
    const submit = (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ): void | Promise<any> => {
        dispatch(actions.addPost(values.postText));
        formikHelpers.setFieldValue("postText", "");
    };

    return (
        <Formik
            initialValues={{ postText: "" }}
            onSubmit={submit}
            className={styles.form}>
            <Form>
                <Field component="textarea" name={"postText"} />
                <button type="submit" className={styles.send__btn}>
                    Send
                </button>
            </Form>
        </Formik>
    );
};

const MyPosts: FC<any> = React.memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts);

    let postsElements = posts.map((item: PostType) => (
        <Post key={item.id} text={item.text} likesCount={item.likesCount} />
    ));

    return (
        <div className={styles.posts}>
            <h3 className={styles.postsHeader}>Posts:</h3>
            {postsElements}
            <PostsForm />
        </div>
    );
});
export default MyPosts;

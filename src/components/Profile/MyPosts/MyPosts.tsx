import React, { FC } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Formik, Form } from "formik";
import { PostType } from "../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { actions } from "../../../redux/profile-reducer";
import { Button } from "@material-ui/core";
import { CustomTextField } from "../../common/Forms/Forms";

type PropsType = {};
type FormValues = {
    postText: string;
};

const PostsForm: FC<PropsType> = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ postText: "" }}
            validate={(values) => {
                const errors: Record<string, string> = {};
                if (values.postText.length === 0)
                    errors.postText = "Should fill it";
                return errors;
            }}
            onSubmit={(
                values: FormValues,
                { setSubmitting, resetForm }: any
            ) => {
                setSubmitting(true);
                dispatch(actions.addPost(values.postText));
                setSubmitting(false);
                resetForm();
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <CustomTextField
                        multiline
                        variant="outlined"
                        type="input"
                        name="postText"
                    />
                    <div style={{ margin: "15px 0" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}>
                            Post
                        </Button>
                    </div>
                </Form>
            )}
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
            <PostsForm />
            {postsElements}
        </div>
    );
});
export default MyPosts;

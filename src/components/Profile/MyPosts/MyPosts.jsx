import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../utilits/validators";
import { FormCreator } from "../../FormControls/FormControls";

const Textarea = FormCreator("textarea");

const PostsForm = (props) => {
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

const MyPosts = React.memo((props) => {
    let onSubmit = (data) => {
        props.addPost(data.postText);
    };

    let postsElements = props.posts.map((item) => (
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

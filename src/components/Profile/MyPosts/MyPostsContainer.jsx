import MyPosts from "./MyPosts.jsx";
import { addPost } from "./../../../redux/profile-reducer";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

const MyPostsContainer = connect(mapStateToProps, {
    addPost,
})(MyPosts);

export default MyPostsContainer;

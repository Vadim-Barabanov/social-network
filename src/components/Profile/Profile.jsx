import MyPosts from "./MyPosts/MyPosts";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={ProfileStyle.profile}>
            <ProfileInfo {...props} />
            <MyPosts
                profile={props.profile}
                addPost={props.addPost}
                posts={props.posts}
            />
        </div>
    );
};
export default Profile;

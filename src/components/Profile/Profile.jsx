import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
    return (
        <main className={ProfileStyle.profile}>
            <ProfileInfo />
            <MyPostsContainer />
        </main>
    );
};
export default Profile;

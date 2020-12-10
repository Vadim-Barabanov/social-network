import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileStyle from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <main className={ProfileStyle.profile}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer />
        </main>
    );
};
export default Profile;

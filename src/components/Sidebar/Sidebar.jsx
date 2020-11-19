import Navbar from "./Navbar/Navbar";
import Friends from "./Friends/Friends";
import SidebarStyles from "./Sidebar.module.css";

const Sidebar = (props) => {
    return (
        <div className={SidebarStyles.wrapper}>
            <Navbar />
            <Friends friendsList={props.friendsList} />
        </div>
    );
};

export default Sidebar;

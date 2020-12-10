import Sidebar from "./Sidebar";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        friendsList: state.sidebar.friendsList,
    };
};

const SidebarContainer = connect(mapStateToProps)(Sidebar);
export default SidebarContainer;

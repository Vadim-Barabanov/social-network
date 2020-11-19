import Sidebar from "./Sidebar";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        friendsList: state.sidebar.friendsList,
    };
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//
//     };
// };

const SidebarContainer = connect(mapStateToProps)(Sidebar);
export default SidebarContainer;
